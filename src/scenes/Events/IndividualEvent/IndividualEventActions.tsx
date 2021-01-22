import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button';
import { PanelType } from '@constants';
import ActionContainer from '@containers/ActionContainer/ActionContainer';
import { IEventGuest } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import EventRsvpButton from '../EventRsvpButton';
import EventShareButton from '../EventShareButton';
import EventViewRecordingButton from '../EventViewRecordingButton';

const IndividualEventAddRecordingButton: React.FC<Partial<ButtonProps>> = (
  props
) => {
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
  const endTime = useStoreState(({ db }) => db.event?.endTime);
  const eventUrl = useStoreState(({ db }) => db.event?.eventUrl);
  const guests = useStoreState(({ db }) => db.event?.guests);
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);

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
    <ActionContainer equal={!isGoing && isUpcoming}>
      <EventRsvpButton large show={!isGoing && isUpcoming} />
      <EventShareButton endTime={endTime} href={eventUrl} />
      <EventViewRecordingButton large href={recordingUrl} show={!isAdmin} />
      <IndividualEventAddRecordingButton show={hasPast && isAdmin} />
    </ActionContainer>
  );
};

export default IndividualEventActions;
