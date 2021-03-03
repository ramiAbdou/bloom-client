import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { ModalType, PanelType } from '@util/constants';
import Row from '@containers/Row/Row';
import { IEventGuest } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import EventsJoinButton from '../EventsJoinButton';
import EventsRsvpButton from '../EventsRsvpButton';
import EventsShareButton from '../EventsShareButton';
import EventsViewRecordingButton from '../EventsViewRecordingButton';

const EventsAddRecordingButton: React.FC<Partial<ButtonProps>> = (props) => {
  const eventId = useStoreState(({ db }) => db.event?.id);
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);
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
  const isAdmin = useStoreState(({ db }) => !!db.member?.role);
  const eventId = useStoreState(({ db }) => db.event?.id);

  const hasPast = useStoreState(({ db }) => {
    return day().isAfter(day(db.event.endTime));
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => {
    showModal({ id: ModalType.CREATE_EVENT, metadata: eventId });
  };

  return (
    <Button fill large secondary show={!hasPast && isAdmin} onClick={onClick}>
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
  const isAdmin = useStoreState(({ db }) => !!db.member?.role);
  const eventId = useStoreState(({ db }) => db.event?.id);
  const guests = useStoreState(({ db }) => db.event?.guests);

  const hasPast: boolean = useStoreState(({ db }) => {
    return day().isAfter(day(db.event.endTime));
  });

  const isUpcoming: boolean = useStoreState(({ db }) => {
    return day().isBefore(day(db.event.startTime));
  });

  const isGoing: boolean = useStoreState(({ db }) => {
    return guests
      ?.map((guestId: string) => db.byGuestId[guestId])
      ?.some((guest: IEventGuest) => guest.member === db.member?.id);
  });

  return (
    <Row className="mt-auto" equal={!isGoing && isUpcoming} spacing="xs">
      <EventsRsvpButton large eventId={eventId} />
      <EventsJoinButton large eventId={eventId} />
      <EventsEditEventButton />
      <EventsShareButton large eventId={eventId} />
      <EventsViewRecordingButton large eventId={eventId} />
      <EventsAddRecordingButton show={hasPast && isAdmin} />
    </Row>
  );
};

export default IndividualEventActions;
