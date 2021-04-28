import React from 'react';
import { showToast } from 'src/App.reactive';

import { DocumentNode, gql, useMutation, useQuery } from '@apollo/client';
import Form from '@components/organisms/Form/Form';
import { OnFormSubmitArgs } from '@components/organisms/Form/Form.types';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
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

const IndividualEventAddRecordingPanelForm: React.FC = () => {
  const { loading, data } = useQuery<GetEventRecordingUrlByIdResult>(
    GET_EVENT_RECORDING_BY_ID
  );

  const [updateEventRecordingUrl] = useMutation<IEvent>(
    UPDATE_EVENT_RECORDING_URL
  );

  if (loading) return null;

  const onSubmit = async ({
    closePanel,
    items,
    setError
  }: OnFormSubmitArgs) => {
    try {
      const recordingUrl: string = items.RECORDING_URL?.value as string;
      await updateEventRecordingUrl({ variables: { recordingUrl } });
      closePanel();
      showToast({ message: 'Event recording link updated.' });
    } catch {
      setError('Failed to link event recording.');
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

export default IndividualEventAddRecordingPanelForm;
