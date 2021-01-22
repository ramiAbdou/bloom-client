import React from 'react';

import Button from '@atoms/Button';
import ActionContainer from '@containers/ActionContainer/ActionContainer';
import { IEventGuest } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';

/**
 * Returns action container that contains either of the following options:
 * - RSVP and Share Event (Before Event)
 * - Share Event (Before Event)
 * - Join and Share Event (Current Event)
 * - Add Event Recording (Past Event and Admin)
 * - View Event Recording (Past Event)
 */
const IndividualEventActions: React.FC = () => {
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const eventUrl = useStoreState(({ db }) => db.event?.eventUrl);
  const guests = useStoreState(({ db }) => db.event?.guests);

  const isGoing: boolean = useStoreState(({ db }) => {
    const { byId: byGuestsId } = db.entities.guests;

    return guests
      ?.map((guestId: string) => byGuestsId[guestId])
      ?.some((guest: IEventGuest) => guest.member === db.member.id);
  });

  const onShareClick = () => {
    navigator.clipboard.writeText(eventUrl);
    showToast({ message: 'Event link copied to clipboard.' });
  };

  return (
    <ActionContainer equal={!isGoing}>
      <Button fill large primary show={!isGoing}>
        RSVP
      </Button>

      <Button fill large secondary onClick={onShareClick}>
        Share Event
      </Button>
    </ActionContainer>
  );
};

export default IndividualEventActions;
