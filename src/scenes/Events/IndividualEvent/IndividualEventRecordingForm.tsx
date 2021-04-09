import React from 'react';

import { IEvent } from '@db/db.entities';
import GQL from '@gql/GQL';
import useFindOne from '@gql/hooks/useFindOne';
import useGQL from '@gql/hooks/useGQL';
import Form from '@organisms/Form/Form';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';

const IndividualEventRecordingForm: React.FC = () => {
  const eventId: string = useStoreState(({ panel }) => panel.metadata);
  const gql: GQL = useGQL();

  const { recordingUrl } = useFindOne(IEvent, {
    fields: ['recordingUrl'],
    where: { id: eventId }
  });

  const onSubmit = async ({
    closePanel,
    items,
    setError,
    showToast
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
        value={recordingUrl ?? ''}
      />

      <FormSubmitButton large={false} loadingText="Saving...">
        Save
      </FormSubmitButton>
    </Form>
  );
};

export default IndividualEventRecordingForm;
