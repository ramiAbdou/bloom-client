import { nanoid } from 'nanoid';
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
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import useEventTitle from '@core/hooks/useEventTitle';
import { modalVar } from '@core/state/Modal.state';
import { IEventGuest } from '@util/constants.entities';
import { now } from '@util/util';

interface CreateEventGuestWithMemberArgs {
  createdAt: string;
  eventId: string;
  id: string;
  updatedAt: string;
}

interface CreateEventGuestWithMemberResult {
  createEventGuest: IEventGuest;
}

const CREATE_EVENT_GUEST_WITH_MEMBER: DocumentNode = gql`
  mutation CreateEventGuest(
    $createdAt: String!
    $eventId: String!
    $id: String!
    $memberId: String
    $updatedAt: String!
  ) {
    memberId @client @export(as: "memberId")

    createEventGuest(
      object: {
        createdAt: $createdAt
        eventId: $eventId
        id: $id
        memberId: $memberId
        updatedAt: $updatedAt
      }
      on_conflict: {
        constraint: event_guests_event_id_member_id_supporter_id_unique
        update_columns: [updatedAt]
      }
    ) {
      createdAt
      id
      updatedAt

      member {
        firstName
        id
        lastName
        pictureUrl
      }
    }
  }
`;

const EventsConfirmRsvpModalHeader: React.FC = () => {
  const eventId: string = modalVar()?.metadata as string;
  const eventTitle: string = useEventTitle(eventId);
  const title: string = `Confirm RSVP to ${eventTitle}`;

  const description: string =
    'You will receive a confirmation email and a reminder email 1 day and 1 hour before the event starts.';

  return <FormHeader description={description} title={title} />;
};

const EventsConfirmRsvpModalForm: React.FC = () => {
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
      await createEventGuestWithMember({
        variables: {
          createdAt: now(),
          eventId,
          id: nanoid(),
          updatedAt: now()
        }
      });

      modalVar(null);
      showToast({ message: 'RSVP was registered.' });
    } catch {
      formDispatch({ error: 'Failed to register RSVP.', type: 'SET_ERROR' });
    }
  };

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <EventsConfirmRsvpModalHeader />
      <ModalConfirmationActions
        primaryLoadingText="Confirming..."
        primaryText="Confirm"
      />
    </Form>
  );
};

export default EventsConfirmRsvpModalForm;
