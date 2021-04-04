import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import { IEventGuest } from '@store/Db/Db.entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, PanelType } from '@util/constants';
import { EventTiming, getEventTiming } from '../Events.util';
import EventsJoinButton from '../EventsJoinButton';
import EventsRsvpButton from '../EventsRsvpButton';
import EventsShareButton from '../EventsShareButton';
import EventsViewRecordingButton from '../EventsViewRecordingButton';

const EventsAddRecordingButton: React.FC<Partial<ButtonProps>> = (props) => {
  const eventId: string = useStoreState(({ db }) => db.event?.id);

  const recordingUrl: string = useStoreState(
    ({ db }) => db.event?.recordingUrl
  );

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
  const isAdmin: boolean = useStoreState(({ db }) => !!db.member?.role);
  const endTime: string = useStoreState(({ db }) => db.event?.endTime);
  const eventId: string = useStoreState(({ db }) => db.event?.id);
  const startTime: string = useStoreState(({ db }) => db.event?.startTime);

  const isPast: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.PAST;

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => {
    showModal({ id: ModalType.CREATE_EVENT, metadata: eventId });
  };

  return (
    <Button fill large secondary show={!isPast && isAdmin} onClick={onClick}>
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
  const isAdmin: boolean = useStoreState(({ db }) => !!db.member?.role);
  const eventId: string = useStoreState(({ db }) => db.event?.id);
  const endTime: string = useStoreState(({ db }) => db.event?.endTime);
  const startTime: string = useStoreState(({ db }) => db.event?.startTime);
  const guests: string[] = useStoreState(({ db }) => db.event?.eventGuests);

  const isPast: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.PAST;

  const isUpcoming: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.UPCOMING;

  const isGoing: boolean = useStoreState(({ db }) =>
    guests
      ?.map((guestId: string) => db.byEventGuestId[guestId])
      ?.some((guest: IEventGuest) => guest.member === db.member?.id)
  );

  return (
    <Row className="mt-auto" equal={!isGoing && isUpcoming} spacing="xs">
      <EventsRsvpButton large eventId={eventId} />
      <EventsJoinButton large eventId={eventId} />
      <EventsEditEventButton />
      <EventsShareButton large eventId={eventId} />
      <EventsViewRecordingButton large eventId={eventId} />
      <EventsAddRecordingButton show={isPast && isAdmin} />
    </Row>
  );
};

export default IndividualEventActions;
