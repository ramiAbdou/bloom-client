import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { PanelType } from '@constants';
import Row from '@containers/Row/Row';
import { IEventGuest } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import EventsJoinButton from '../EventsJoinButton';
import EventsRsvpButton from '../EventsRsvpButton';
import EventsShareButton from '../EventsShareButton';
import EventsViewRecordingButton from '../EventsViewRecordingButton';

const EventsAddRecordingButton: React.FC<Partial<ButtonProps>> = (props) => {
  const eventId = useStoreState(({ db }) => db.event?.id);
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);

  const panelId = `${PanelType.ADD_RECORDING_LINK}-${eventId}`;
  const onClick = () => showPanel(panelId);

  return (
    <Button fill large secondary id={panelId} onClick={onClick} {...props}>
      {recordingUrl ? 'Edit Event Recording' : '+ Add Event Recording'}
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
  const isAdmin = useStoreState(({ db }) => !!db.member.role);
  const eventId = useStoreState(({ db }) => db.event?.id);
  const guests = useStoreState(({ db }) => db.event?.guests);

  const hasPast: boolean = useStoreState(({ db }) => {
    return day.utc().isAfter(db.event.endTime);
  });

  const isUpcoming: boolean = useStoreState(({ db }) => {
    return day.utc().isBefore(db.event.startTime);
  });

  const isGoing: boolean = useStoreState(({ db }) => {
    const { byId: byGuestsId } = db.entities.guests;

    return guests
      ?.map((guestId: string) => byGuestsId[guestId])
      ?.some((guest: IEventGuest) => guest.member === db.member.id);
  });

  return (
    <Row marginTopAuto equal={!isGoing && isUpcoming}>
      <EventsRsvpButton large eventId={eventId} />
      <EventsJoinButton large eventId={eventId} />
      <EventsShareButton large eventId={eventId} />
      <EventsViewRecordingButton large eventId={eventId} />
      <EventsAddRecordingButton show={hasPast && isAdmin} />
    </Row>
  );
};

export default IndividualEventActions;