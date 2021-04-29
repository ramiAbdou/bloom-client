import React from 'react';
import { showToast } from 'src/App.reactive';

import { DocumentNode, gql, useMutation, useQuery } from '@apollo/client';
import Form, { OnFormSubmitArgs } from '@components/organisms/Form/Form';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { closePanel } from '@components/organisms/Panel/Panel.state';
import { IEvent } from '@util/constants.entities';

interface GetEventRecordingUrlByIdResult {
  event: IEvent;
}

const GET_EVENT_RECORDING_BY_ID: DocumentNode = gql`
  query GetEventRecordingUrl($eventId: String!) {
    eventId @client @export(as: "eventId")

    event(id: $eventId) {
      id
      recordingUrl
    }
  }
`;

const UPDATE_EVENT_RECORDING_URL: DocumentNode = gql`
  mutation UpdateEventRecordingUrl($eventId: String!, $recordingUrl: String) {
    eventId @client @export(as: "eventId")

    updateEvent(
      pk_columns: { id: $eventId }
      _set: { recordingUrl: $recordingUrl }
    ) {
      id
      recordingUrl
    }
  }
`;

const AddRecordingLinkPanelForm: React.FC = () => {
  const { loading, data } = useQuery<GetEventRecordingUrlByIdResult>(
    GET_EVENT_RECORDING_BY_ID
  );

  const [updateEventRecordingUrl] = useMutation<IEvent>(
    UPDATE_EVENT_RECORDING_URL
  );

  // Need to make sure the previous event recording is loaded.
  if (loading) return null;

  const onSubmit = async ({ items, formDispatch }: OnFormSubmitArgs) => {
    try {
      const recordingUrl: string = items.RECORDING_URL?.value as string;
      await updateEventRecordingUrl({ variables: { recordingUrl } });
      closePanel();
      showToast({ message: 'Event recording link updated.' });
    } catch {
      formDispatch({
        error: 'Failed to link event recording.',
        type: 'SET_ERROR'
      });
    }
  };

  const event: IEvent = data?.event;

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

export default AddRecordingLinkPanelForm;
