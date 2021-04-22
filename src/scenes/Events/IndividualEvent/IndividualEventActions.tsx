import React from 'react';
import { eventIdVar, memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Button, { ButtonProps } from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import useFindOne from '@core/gql/hooks/useFindOne';
import { useStoreActions } from '@core/store/Store';
import { ModalType, PanelType } from '@util/constants';
import { IEvent, IEventGuest, IMember } from '@util/constants.entities';
import { EventTiming, getEventTiming } from '../Events.util';
import EventsJoinButton from '../EventsJoinButton';
import EventsRsvpButton from '../EventsRsvpButton';
import EventsShareButton from '../EventsShareButton';
import EventsViewRecordingButton from '../EventsViewRecordingButton';

const EventsAddRecordingButton: React.FC<Partial<ButtonProps>> = (props) => {
  const eventId: string = useReactiveVar(eventIdVar);
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['recordingUrl'],
    where: { id: eventId }
  });

  if (loading) return null;

  const onClick = () => {
    showPanel({ id: PanelType.ADD_RECORDING_LINK, metadata: eventId });
  };

  return (
    <Button
      fill
      large
      secondary
      id={PanelType.ADD_RECORDING_LINK}
      onClick={onClick}
      {...props}
    >
      {event.recordingUrl ? 'Edit Event Recording' : '+ Add Event Recording'}
    </Button>
  );
};

const EventsEditEventButton: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);
  const memberId: string = useReactiveVar(memberIdVar);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { data: event, loading: loading1 } = useFindOne(IEvent, {
    fields: ['endTime', 'eventGuests.id', 'eventGuests.member.id', 'startTime'],
    where: { id: eventId }
  });

  const { data: member, loading: loading2 } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  if (loading1 || loading2) return null;

  const isPast: boolean = getEventTiming(event) === EventTiming.PAST;

  const onClick = () => {
    showModal({ id: ModalType.CREATE_EVENT, metadata: eventId });
  };

  return (
    <Button
      fill
      large
      secondary
      show={!isPast && !!member.role}
      onClick={onClick}
    >
      Edit Event
    </Button>
  );
};

/**
 * Returns action container that contains either of the following options:
 * - RSVP and Share Event (Before Event)
 * - Share Event (Before Event)
 * - Join and Share Event (Current Event)
 * - Add Event Recording (Past Event and Admin)
 * - View Event Recording (Past Event)
 */
const IndividualEventActions: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: event, loading: loading1 } = useFindOne(IEvent, {
    fields: ['endTime', 'eventGuests.id', 'eventGuests.member.id', 'startTime'],
    where: { id: eventId }
  });

  const { data: member, loading: loading2 } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  if (loading1 || loading2) return null;

  const isPast: boolean = getEventTiming(event) === EventTiming.PAST;
  const isUpcoming: boolean = getEventTiming(event) === EventTiming.UPCOMING;

  const isGoing: boolean = event.eventGuests.some(
    (eventGuest: IEventGuest) => eventGuest.member?.id === memberId
  );

  return (
    <Row className="mt-auto" equal={!isGoing && isUpcoming} spacing="xs">
      <EventsRsvpButton large eventId={eventId} />
      <EventsJoinButton large eventId={eventId} />
      <EventsEditEventButton />
      <EventsShareButton large eventId={eventId} />
      <EventsViewRecordingButton large eventId={eventId} />
      <EventsAddRecordingButton show={isPast && !!member.role} />
    </Row>
  );
};

export default IndividualEventActions;
