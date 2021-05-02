import React from 'react';
import { showToast } from 'src/App.reactive';

import {
  ApolloCache,
  DocumentNode,
  gql,
  Reference,
  useMutation
} from '@apollo/client';
import Form, {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import FormHeader from '@components/organisms/Form/FormHeader';
import Modal from '@components/organisms/Modal/Modal';
import { closeModal, modalVar } from '@components/organisms/Modal/Modal.state';
import ModalConfirmationActionRow from '@components/organisms/Modal/ModalConfirmationActionRow';
import useEventTitle from '@core/hooks/useEventTitle';
import { IEventGuest } from '@util/constants.entities';

interface CreateEventGuestWithMemberArgs {
  eventId: string;
}

interface CreateEventGuestWithMemberResult {
  createEventGuest: IEventGuest;
}

const CREATE_EVENT_GUEST_WITH_MEMBER: DocumentNode = gql`
  mutation CreateEventGuest($eventId: String!, $memberId: String) {
    memberId @client @export(as: "memberId")

    createEventGuest(
      object: { eventId: $eventId, memberId: $memberId }
      on_conflict: {
        constraint: event_guests_event_id_member_id_supporter_id_unique
        update_columns: [updatedAt]
      }
    ) {
      createdAt
      id

      member {
        firstName
        id
        lastName
        pictureUrl
      }
    }
  }
`;

const EventsConfirmRsvpModalFormHeader: React.FC = () => {
  const eventId: string = modalVar()?.metadata as string;
  const eventTitle: string = useEventTitle(eventId);
  const title: string = `Confirm RSVP to ${eventTitle}`;

  const description: string =
    'You will receive a confirmation email and a reminder email 1 day and 1 hour before the event starts.';

  return <FormHeader description={description} title={title} />;
};

const EventsConfirmRsvpModal: React.FC = () => {
  const eventId: string = modalVar()?.metadata as string;

  const [createEventGuestWithMember] = useMutation<
    CreateEventGuestWithMemberResult,
    CreateEventGuestWithMemberArgs
  >(CREATE_EVENT_GUEST_WITH_MEMBER, {
    update: (
      cache: ApolloCache<CreateEventGuestWithMemberResult>,
      { data }
    ) => {
      const eventGuest: IEventGuest = data?.createEventGuest;

      cache.modify({
        fields: {
          eventGuests: (existingEventGuestRefs: Reference[] = []) => {
            const newEventGuestRef: Reference = cache.writeFragment({
              data: eventGuest,
              fragment: gql`
                fragment NewEventGuest on event_guests {
                  id
                }
              `
            });

            return [...existingEventGuestRefs, newEventGuestRef];
          }
        },
        id: `events:${eventId}`
      });
    }
  });

  const onSubmit: OnFormSubmitFunction = async ({
    formDispatch
  }: OnFormSubmitArgs) => {
    try {
      await createEventGuestWithMember({ variables: { eventId } });
      closeModal();
      showToast({ message: 'RSVP was registered.' });
    } catch (e) {
      console.log(e);
      formDispatch({ error: 'Failed to register RSVP.', type: 'SET_ERROR' });
    }
  };

  return (
    <Modal>
      <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
        <EventsConfirmRsvpModalFormHeader />
        <ModalConfirmationActionRow
          primaryLoadingText="Confirming..."
          primaryText="Confirm"
        />
      </Form>
    </Modal>
  );
};

export default EventsConfirmRsvpModal;
