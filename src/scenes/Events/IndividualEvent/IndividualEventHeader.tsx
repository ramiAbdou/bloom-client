import React from 'react';
import { IoCreateOutline } from 'react-icons/io5';

import Button from '@atoms/Button';
import { HeaderTag } from '@atoms/Tags';
import ActionContainer from '@containers/ActionContainer/ActionContainer';
import Row from '@containers/Row/Row';
import { IEventGuest } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import EventStore from '../Event.store';

const IndividualEventHeaderContent: React.FC = () => {
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const eventUrl = EventStore.useStoreState((event) => event.eventUrl);
  const guests = EventStore.useStoreState((event) => event.guests);
  const isPrivate = EventStore.useStoreState((event) => event.private);
  const title = EventStore.useStoreState((event) => event.title);

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
    <div className="s-events-individual-header-content">
      <div>
        <Row spaceBetween>
          <h4>Sat, Jan 21st, 11:00 AM - 12:30 PM EST</h4>
          <Button tertiary>
            Edit
            <IoCreateOutline />
          </Button>
        </Row>

        <h1>{title}</h1>
        <HeaderTag>{isPrivate ? 'Members Only' : 'Open to All'} </HeaderTag>
      </div>

      <ActionContainer equal={!isGoing}>
        <Button fill large primary show={!isGoing}>
          RSVP
        </Button>
        <Button fill large secondary onClick={onShareClick}>
          Share Event
        </Button>
      </ActionContainer>
    </div>
  );
};

const IndividualEventHeader: React.FC = () => {
  return (
    <div className="s-events-individual-header">
      <div>
        <div />
      </div>
      <IndividualEventHeaderContent />
    </div>
  );
};

export default IndividualEventHeader;
