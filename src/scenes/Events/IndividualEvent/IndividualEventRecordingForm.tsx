import React from 'react';

import useMutation from '@hooks/useMutation';
import Form from '@organisms/Form/Form';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { MutationEvent } from '@util/constants.events';

interface UpdateRecordingUrlArgs {
  eventId: string;
  recordingUrl: string;
}

const IndividualEventRecordingForm: React.FC = () => {
  const eventId = useStoreState(({ panel }) => panel.metadata);
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);

  const [updateEvent] = useMutation<IEvent, UpdateRecordingUrlArgs>({
    fields: ['id', 'recordingUrl'],
    operation: MutationEvent.UPDATE_EVENT,
    schema: Schema.EVENT,
    types: { eventId: { required: true }, recordingUrl: { required: false } }
  });

  const onSubmit = async ({
    closePanel,
    items,
    showToast
  }: OnFormSubmitArgs) => {
    await updateEvent({
      eventId,
      recordingUrl: items.RECORDING_URL?.value as string
    });

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
