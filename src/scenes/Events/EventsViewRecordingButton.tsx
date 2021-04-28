import { nanoid } from 'nanoid';
import React from 'react';

import { DocumentNode, gql, useMutation } from '@apollo/client';
import Button, { ButtonProps } from '@components/atoms/Button/Button';
import useMemberRole from '@core/hooks/useMemberRole';
import useIsMember from '@hooks/useIsMember';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { ComponentWithFragments } from '@util/constants';
import { IEvent, IEventWatch, MemberRole } from '@util/constants.entities';
import { now } from '@util/util';

interface CreateEventWatchArgs {
  createdAt: string;
  eventId: string;
  id: string;
  updatedAt: string;
}

const CREATE_EVENT_WATCH: DocumentNode = gql`
  mutation CreateEventWatch(
    $createdAt: String!
    $eventId: String!
    $id: String!
    $memberId: String
    $updatedAt: String!
  ) {
    memberId @client @export(as: "memberId")

    createEventWatch(
      object: {
        createdAt: $createdAt
        eventId: $eventId
        id: $id
        memberId: $memberId
        updatedAt: $updatedAt
      }
      on_conflict: {
        constraint: event_watches_event_id_member_id_unique
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

const EventsViewRecordingButton: ComponentWithFragments<
  IEvent,
  Partial<Pick<ButtonProps, 'large'>>
> = ({ data: event, large }) => {
  const [createEventWatch, { loading }] = useMutation<
    IEventWatch,
    CreateEventWatchArgs
  >(CREATE_EVENT_WATCH);

  const isMember: boolean = useIsMember();
  const role: MemberRole = useMemberRole();

  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isPast: boolean = eventTiming === EventTiming.PAST;

  if (!isPast || !isMember || (role && large)) return null;

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    await createEventWatch({
      variables: {
        createdAt: now(),
        eventId: event.id,
        id: nanoid(),
        updatedAt: now()
      }
    });

    // await gql.create(IEventWatch, {
    //   data: { eventId, memberId },
    //   fields: [
    //     'createdAt',
    //     'event.id',
    //     'id',
    //     'member.firstName',
    //     'member.id',
    //     'member.lastName',
    //     'member.pictureUrl'
    //   ]
    // });
  };

  return (
    <Button
      fill
      disabled={!event.recordingUrl}
      href={event.recordingUrl}
      large={large}
      loading={loading}
      primary={!!event.recordingUrl}
      secondary={!event.recordingUrl}
      onClick={onClick}
    >
      {event.recordingUrl ? 'View Recording' : 'No Recording Available'}
    </Button>
  );
};

EventsViewRecordingButton.fragment = gql`
  fragment EventsViewRecordingButtonFragment on events {
    endTime
    id
    recordingUrl
    startTime
  }
`;

export default EventsViewRecordingButton;
