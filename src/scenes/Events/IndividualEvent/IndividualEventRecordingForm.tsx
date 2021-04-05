import React from 'react';

import useGQL from '@gql/useGQL';
import Form from '@organisms/Form/Form';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';

const IndividualEventRecordingForm: React.FC = () => {
  const gql = useGQL();

  const eventId = useStoreState(({ panel }) => panel.metadata);
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);

  const onSubmit = async ({
    closePanel,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const { error } = await gql.events.update({
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
