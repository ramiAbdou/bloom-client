import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button';
import { PanelType } from '@constants';
import ActionContainer from '@containers/ActionContainer/ActionContainer';
import { IEventGuest } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';

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

const IndividualEventRSVPButton: React.FC<Partial<ButtonProps>> = (props) => {
  // const showPanel = useStoreActions(({ panel }) => panel.showPanel);
  // const onClick = () => {};

  return (
    <Button fill large primary {...props}>
      RSVP
    </Button>
  );
};

const IndividualEventShareButton: React.FC<Partial<ButtonProps>> = (props) => {
  const eventUrl = useStoreState(({ db }) => db.event?.eventUrl);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const onClick = () => {
    navigator.clipboard.writeText(eventUrl);
    showToast({ message: 'Event link copied to clipboard.' });
  };

  return (
    <Button fill large secondary onClick={onClick} {...props}>
      Share Event
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
    <ActionContainer equal={!isGoing && isUpcoming}>
      <IndividualEventRSVPButton show={!isGoing && isUpcoming} />
      <IndividualEventAddRecordingButton show={hasPast && isAdmin} />
      <IndividualEventShareButton show={!hasPast} />
    </ActionContainer>
  );
};

export default IndividualEventActions;
