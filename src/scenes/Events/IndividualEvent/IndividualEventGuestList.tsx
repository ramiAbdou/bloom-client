import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Button from '@components/atoms/Button/Button';
import Card from '@components/containers/Card/Card';
import { IEvent, IEventGuest } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import useIsMember from '@hooks/useIsMember';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import List from '@components/organisms/List/List';
import ListStore from '@components/organisms/List/List.store';
import { ModalData } from '@components/organisms/Modal/Modal.types';
import { useStoreActions, useStoreState } from '@store/Store';
import { IdProps, ModalType } from '@util/constants';
import { cx, sortObjects } from '@util/util';
import { EventTiming, getEventTiming } from '../Events.util';

const IndividualEventGuest: React.FC<IdProps> = ({ id: guestId }) => {
  const isMember: boolean = useIsMember();

  const { member, supporter }: IEventGuest = useFindOne(IEventGuest, {
    fields: [
      'member.firstName',
      'member.id',
      'member.lastName',
      'supporter.firstName',
      'supporter.id',
      'supporter.lastName'
    ],
    where: { id: guestId }
  });

  const firstName: string = member?.firstName ?? supporter?.firstName;
  const lastName: string = member?.lastName ?? supporter?.lastName;
  const fullName: string = `${firstName} ${lastName}`;

  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const onClick = (): void => {
    if (isMember && member.id) {
      showModal({ id: ModalType.PROFILE, metadata: member.id });
    }
  };

  const css: string = cx('s-events-individual-member', {
    's-events-individual-member--disabled': !isMember
  });

  return (
    <Button className={css} onClick={onClick}>
      <ProfilePicture
        fontSize={16}
        memberId={member.id}
        size={36}
        supporterId={supporter.id}
      />

      <p className="body--bold">{fullName}</p>
    </Button>
  );
};

const IndividualEventGuestListContent: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { eventGuests }: IEvent = useFindOne(IEvent, {
    fields: ['eventGuests.createdAt', 'eventGuests.id'],
    where: { id: eventId }
  });

  const sortedEventGuests: IdProps[] = eventGuests
    ?.sort((a: IEventGuest, b: IEventGuest) => sortObjects(a, b, 'createdAt'))
    ?.map((eventGuest: IEventGuest) => {
      return { id: eventGuest.id };
    });

  return (
    <>
      {!sortedEventGuests?.length && <p>No guests have RSVP'd yet.</p>}

      <List
        className="s-events-card-ctr"
        items={sortedEventGuests}
        render={IndividualEventGuest}
      />
    </>
  );
};

const IndividualEventGuestList: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { endTime, eventGuests, startTime } = useFindOne(IEvent, {
    fields: ['endTime', 'eventGuests.id', 'startTime'],
    where: { id: eventId }
  });

  const guestsCount: number = eventGuests?.length;

  const hasEventFinished: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.PAST;

  return (
    <Card
      className="s-events-individual-card"
      headerTag={guestsCount ? `${guestsCount} Going` : null}
      show={!hasEventFinished}
      title="Guest List"
    >
      <ListStore.Provider>
        <IndividualEventGuestListContent />
      </ListStore.Provider>
    </Card>
  );
};

export default IndividualEventGuestList;
