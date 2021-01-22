import React from 'react';

import { IdProps, PanelType } from '@constants';
import useMutation from '@hooks/useMutation';
import Form from '@organisms/Form/Form';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Panel from '@organisms/Panel/Panel';
import { IEvent } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { UPDATE_RECORDING_LINK } from '../Events.gql';

const IndividualEventPanel: React.FC<IdProps> = ({ id }) => {
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [updateRecordingLink] = useMutation<
    IEvent,
    Pick<IEvent, 'id' | 'recordingUrl'>
  >({
    name: 'updateRecordingLink',
    query: UPDATE_RECORDING_LINK,
    schema: Schema.EVENT
  });

  const onSubmit = async ({ items }: OnFormSubmitArgs) => {
    const value = items[0]?.value;
    await updateRecordingLink({ id, recordingUrl: value });
    showToast({ message: 'Event recording link updated.' });
    closePanel();
  };

  return (
    <Panel
      align="BOTTOM_LEFT"
      id={`${PanelType.ADD_RECORDING_LINK}-${id}`}
      size="lg"
    >
      <Form onSubmit={onSubmit}>
        <FormItem
          required
          title="Event Recording Link"
          type="SHORT_TEXT"
          validate="IS_URL"
          value={recordingUrl ?? ''}
        />

        <FormSubmitButton large={false} loadingText="Saving...">
          Save
        </FormSubmitButton>
      </Form>
    </Panel>
  );
};

export default IndividualEventPanel;
