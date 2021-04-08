import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import { IEvent, IEventGuest, IMember } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, PanelType } from '@util/constants';
import { EventTiming, getEventTiming } from '../Events.util';
import EventsJoinButton from '../EventsJoinButton';
import EventsRsvpButton from '../EventsRsvpButton';
import EventsShareButton from '../EventsShareButton';
import EventsViewRecordingButton from '../EventsViewRecordingButton';

const EventsAddRecordingButton: React.FC<Partial<ButtonProps>> = (props) => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { recordingUrl } = useFindOne(IEvent, {
    fields: ['recordingUrl'],
    where: { id: eventId }
  });

  const showPanel = useStoreActions(({ panel }) => panel.showPanel);

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
      {recordingUrl ? 'Edit Event Recording' : '+ Add Event Recording'}
    </Button>
  );
};

const EventsEditEventButton: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);
  const memberId: string = useStoreState(({ db }) => db.memberId);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { endTime, startTime } = useFindOne(IEvent, {
    fields: ['endTime', 'eventGuests.id', 'eventGuests.member.id', 'startTime'],
    where: { id: eventId }
  });

  const { role } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  const isPast: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.PAST;

  const onClick = () => {
    showModal({ id: ModalType.CREATE_EVENT, metadata: eventId });
  };

  return (
    <Button fill large secondary show={!isPast && !!role} onClick={onClick}>
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
  const eventId: string = useStoreState(({ db }) => db.eventId);
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { endTime, eventGuests, startTime } = useFindOne(IEvent, {
    fields: ['endTime', 'eventGuests.id', 'eventGuests.member.id', 'startTime'],
    where: { id: eventId }
  });

  const { role } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  const isPast: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.PAST;

  const isUpcoming: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.UPCOMING;

  const isGoing: boolean = eventGuests.some(
    (eventGuest: IEventGuest) => eventGuest.member?.id === memberId
  );

  return (
    <Row className="mt-auto" equal={!isGoing && isUpcoming} spacing="xs">
      <EventsRsvpButton large eventId={eventId} />
      <EventsJoinButton large eventId={eventId} />
      <EventsEditEventButton />
      <EventsShareButton large eventId={eventId} />
      <EventsViewRecordingButton large eventId={eventId} />
      <EventsAddRecordingButton show={isPast && !!role} />
    </Row>
  );
};

export default IndividualEventActions;
