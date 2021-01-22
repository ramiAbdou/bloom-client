import React from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import Button from '@atoms/Button';
import { HeaderTag } from '@atoms/Tags';
import { ModalType } from '@constants';
import ActionContainer from '@containers/ActionContainer/ActionContainer';
import Row from '@containers/Row/Row';
import { IEventGuest } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import EventStore from '../Event.store';

const IndividualEventHeaderDateContainer: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const eventId = EventStore.useStoreState((event) => event.id);

  const onClick = () => showModal(`${ModalType.CREATE_EVENT}-${eventId}`);

  return (
    <Row spaceBetween className="s-events-individual-header-date">
      <div>
        <h4>Saturday, January 21st</h4>
        <p className="meta">11:00 AM - 12:30 PM EST</p>
      </div>

      <Button tertiary onClick={onClick}>
        Edit
        <IoCreateOutline />
      </Button>
    </Row>
  );
};

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
        <IndividualEventHeaderDateContainer />
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
