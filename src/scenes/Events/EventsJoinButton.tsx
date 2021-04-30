import React from 'react';

import {
  ApolloCache,
  DocumentNode,
  gql,
  Reference,
  useMutation
} from '@apollo/client';
import Button, { ButtonProps } from '@components/atoms/Button/Button';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@components/organisms/Modal/Modal.types';
import useIsMember from '@hooks/useIsMember';
import { ComponentWithFragments } from '@util/constants';
import { IEvent, IEventAttendee } from '@util/constants.entities';
import { EventTiming, getEventTiming } from './Events.util';

interface CreateEventAttendeeArgs {
  eventId: string;
}

interface CreateEventAttendeeResult {
  createEventAttendee: IEventAttendee;
}

const CREATE_EVENT_ATTENDEE_WITH_MEMBER: DocumentNode = gql`
  mutation CreateEventAttendee($eventId: String!, $memberId: String) {
    memberId @client @export(as: "memberId")

    createEventAttendee(
      object: { eventId: $eventId, memberId: $memberId }
      on_conflict: {
        constraint: event_attendees_event_id_member_id_supporter_id_unique
        update_columns: [updatedAt]
      }
    ) {
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

const EventsJoinButton: ComponentWithFragments<
  IEvent,
  Partial<Pick<ButtonProps, 'large'>>
> = ({ data: event, large }) => {
  const [createEventAttendeeWithMember, { loading }] = useMutation<
    CreateEventAttendeeResult,
    CreateEventAttendeeArgs
  >(CREATE_EVENT_ATTENDEE_WITH_MEMBER, {
    update: (cache: ApolloCache<CreateEventAttendeeResult>, { data }) => {
      const eventAttendee: IEventAttendee = data?.createEventAttendee;

      cache.modify({
        fields: {
          events: (existingEventAttendeeRefs: Reference[] = []) => {
            const newEventAttendeeRef: Reference = cache.writeFragment({
              data: eventAttendee,
              fragment: gql`
                fragment NewEventAttendee on event_attendees {
                  id
                }
              `
            });

            return [...existingEventAttendeeRefs, newEventAttendeeRef];
          }
        },
        id: `events:${event.id}`
      });
    }
  });

  const isMember: boolean = useIsMember();

  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isHappeningNowOrStartingSoon: boolean =
    eventTiming === EventTiming.HAPPENING_NOW ||
    eventTiming === EventTiming.STARTING_SOON;

  if (!isHappeningNowOrStartingSoon) return null;

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Stop propagation so that we don't open the event page (default for
    // clicking the background of an EventsCard).
    e.stopPropagation();

    if (!isMember) {
      showModal({ id: ModalType.CHECK_IN, metadata: event.id });
    }

    await createEventAttendeeWithMember({ variables: { eventId: event.id } });
  };

  return (
    <Button
      fill
      primary
      href={isMember ? event.videoUrl : null}
      large={large}
      loading={loading}
      onClick={onClick}
    >
      Join
    </Button>
  );
};

EventsJoinButton.fragment = gql`
  fragment EventsJoinButtonFragment on events {
    endTime
    startTime
    videoUrl
  }
`;

export default EventsJoinButton;
