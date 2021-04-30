import React from 'react';

import { DocumentNode, gql, useMutation } from '@apollo/client';
import Button, { ButtonProps } from '@components/atoms/Button/Button';
import useMemberRole from '@core/hooks/useMemberRole';
import useIsMember from '@hooks/useIsMember';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { ComponentWithFragments } from '@util/constants';
import { IEvent, IEventWatch, MemberRole } from '@util/constants.entities';

interface CreateEventWatchArgs {
  eventId: string;
}

const CREATE_EVENT_WATCH: DocumentNode = gql`
  mutation CreateEventWatch($eventId: String!, $memberId: String) {
    memberId @client @export(as: "memberId")

    createEventWatch(
      object: { eventId: $eventId, memberId: $memberId }
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

    await createEventWatch({ variables: { eventId: event.id } });
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
