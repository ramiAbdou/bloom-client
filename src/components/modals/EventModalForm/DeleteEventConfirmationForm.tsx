import React from 'react';
import { showToast } from 'src/App.reactive';

import { DocumentNode, gql, useMutation, useReactiveVar } from '@apollo/client';
import Form, {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import FormHeader from '@components/organisms/Form/FormHeader';
import { closeModal, modalVar } from '@components/organisms/Modal/Modal.state';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import { IEvent } from '@util/constants.entities';
import { now } from '@util/util';

interface DeleteEventArgs {
  deletedAt: string;
  eventId: string;
}

const DELETE_EVENT: DocumentNode = gql`
  mutation DeleteEvent($deletedAt: String!, $eventId: String!) {
    updateEvent(pk_columns: { id: $eventId }, _set: { deletedAt: $deletedAt }) {
      deletedAt
      id
    }
  }
`;

const DeleteEventConfirmationForm: React.FC = () => {
  const [deleteEvent] = useMutation<IEvent, DeleteEventArgs>(DELETE_EVENT);
  const eventId: string = useReactiveVar(modalVar)?.metadata as string;

  const onSubmit: OnFormSubmitFunction = async ({
    formDispatch
  }: OnFormSubmitArgs) => {
    try {
      await deleteEvent({ variables: { deletedAt: now(), eventId } });
      closeModal();
      showToast({ message: 'Event deleted.' });
    } catch {
      formDispatch({
        error: 'Failed to delete the Event. Please try again later.',
        type: 'SET_ERROR'
      });
    }
  };

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <FormHeader
        description="Are you sure you want to delete this event? You will not be able to undo this action. If anybody has RSVP'd, we will send them an email about the cancellation."
        title="Delete event?"
      />

      <ModalConfirmationActions
        primaryLoadingText="Deleting..."
        primaryText="Delete"
      />
    </Form>
  );
};

export default DeleteEventConfirmationForm;
