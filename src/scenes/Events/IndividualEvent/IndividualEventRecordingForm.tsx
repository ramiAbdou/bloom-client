import React from 'react';
import { showToast } from 'src/App.reactive';

import Form from '@components/organisms/Form/Form';
import { OnFormSubmitArgs } from '@components/organisms/Form/Form.types';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import useFindOne from '@core/gql/hooks/useFindOne';
import { useStoreState } from '@core/store/Store';
import GQL from '@gql/GQL';
import useGQL from '@gql/hooks/useGQL';
import { IEvent } from '@util/constants.entities';

const IndividualEventRecordingForm: React.FC = () => {
  const eventId: string = useStoreState(({ panel }) => panel.metadata);
  const gql: GQL = useGQL();

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['recordingUrl'],
    where: { id: eventId }
  });

  if (loading) return null;

  const onSubmit = async ({
    closePanel,
    items,
    setError
  }: OnFormSubmitArgs) => {
    const { error } = await gql.update(IEvent, {
      data: { recordingUrl: items.RECORDING_URL?.value as string },
      where: { id: eventId }
    });

    if (error) {
      setError('Failed to link event recording.');
      return;
    }

    closePanel();
    showToast({ message: 'Event recording link updated.' });
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormShortText
        id="RECORDING_URL"
        title="Event Recording Link"
        validate="IS_URL"
        value={event.recordingUrl ?? ''}
      />

      <FormSubmitButton large={false} loadingText="Saving...">
        Save
      </FormSubmitButton>
    </Form>
  );
};

export default IndividualEventRecordingForm;
