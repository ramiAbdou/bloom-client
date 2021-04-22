import React from 'react';
import { useHistory } from 'react-router-dom';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Form from '@components/organisms/Form/Form';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import { ICommunity, IEvent } from '@util/db.entities';
import { useStoreState } from '@core/store/Store';
import { now } from '@util/util';

const DeleteEventConfirmationForm: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const { push } = useHistory();

  const onSubmit: OnFormSubmitFunction = async ({
    closeModal,
    gql,
    setError,
    showToast
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
      setError('Failed to delete the Event. Please try again later.');
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
