import React from 'react';
import { useHistory } from 'react-router-dom';
import { communityIdVar, showToast } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Form, {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import FormHeader from '@components/organisms/Form/FormHeader';
import { closeModal, modalVar } from '@components/organisms/Modal/Modal.state';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import { ICommunity, IEvent } from '@util/constants.entities';
import { now } from '@util/util';

const DeleteEventConfirmationForm: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);
  const eventId: string = useReactiveVar(modalVar)?.metadata as string;

  const { push } = useHistory();

  const onSubmit: OnFormSubmitFunction = async ({
    gql,
    formDispatch
  }: OnFormSubmitArgs) => {
    // Fetch the URL name of the community so we can push to correct URL.
    const { urlName } = await gql.findOne(ICommunity, {
      fields: ['urlName'],
      where: { id: communityId }
    });

    // Set the event's deletedAt to the current timestamp.
    const { error } = await gql.update(IEvent, {
      data: { deletedAt: now() },
      where: { id: eventId }
    });

    if (error) {
      formDispatch({
        error: 'Failed to delete the Event. Please try again later.',
        type: 'SET_ERROR'
      });

      return;
    }

    // Close the modal, show a confirmation toast and push to upcoming events
    // page.
    closeModal();
    showToast({ message: 'Event deleted.' });
    push(`/${urlName}/events/upcoming`);
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
