import React from 'react';

import useMutation from '@hooks/useMutation';
import Form from '@organisms/Form/Form';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const IndividualEventRecordingForm: React.FC = () => {
  const id = useStoreState(({ panel }) => panel.metadata);
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);

  const [updateEvent] = useMutation<
    IEvent,
    Pick<IEvent, 'id' | 'recordingUrl'>
  >({
    fields: ['id', 'recordingUrl'],
    operation: 'updateEvent',
    schema: Schema.EVENT,
    types: { id: { required: true }, recordingUrl: { required: false } }
  });

  const onSubmit = async ({
    closePanel,
    items,
    showToast
  }: OnFormSubmitArgs) => {
    const value = items.RECORDING_URL?.value;
    await updateEvent({ id, recordingUrl: value });
    showToast({ message: 'Event recording link updated.' });
    closePanel();
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
