import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import { IEventGuest, IMember, ISupporter } from '@db/db.entities';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { ModalData } from '@organisms/Modal/Modal.types';
import { useStoreActions, useStoreState } from '@store/Store';
import { IdProps, ModalType } from '@util/constants';
import { cx, sortObjects } from '@util/util';
import { EventTiming, getEventTiming } from '../Events.util';

const IndividualEventGuest: React.FC<IdProps> = ({ id: guestId }) => {
  const isMember: boolean = useStoreState(({ db }) => db.isMember);

  const memberId: string = useStoreState(({ db }) => {
    const guest: IEventGuest = db.byEventGuestId[guestId];
    return guest?.member;
  });

  const supporterId: string = useStoreState(({ db }) => {
    const guest: IEventGuest = db.byEventGuestId[guestId];
    return guest?.supporter;
  });

  const fullName: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    const supporter: ISupporter = db.bySupporterId[supporterId];

    const firstName: string = member?.firstName ?? supporter?.firstName;
    const lastName: string = member?.lastName ?? supporter?.lastName;

    return `${firstName} ${lastName}`;
  });

  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const onClick = (): void => {
    if (isMember && memberId) {
      showModal({ id: ModalType.PROFILE, metadata: memberId });
    }
  };

  const css: string = cx('s-events-individual-member', {
    's-events-individual-member--disabled': !isMember
  });

  return (
    <Button className={css} onClick={onClick}>
      <ProfilePicture
        fontSize={16}
        memberId={memberId}
        size={36}
        supporterId={supporterId}
      />

      <p className="body--bold">{fullName}</p>
    </Button>
  );
};

const IndividualEventGuestListContent: React.FC = () => {
  const guests: IdProps[] = useStoreState(({ db }) =>
    db.event?.eventGuests
      ?.map((guestId: string) => db.byEventGuestId[guestId])
      ?.sort((a: IEventGuest, b: IEventGuest) => sortObjects(a, b, 'createdAt'))
      ?.map((guest: IEventGuest) => {
        return { id: guest.id };
      })
  );

  return (
    <>
      {!guests?.length && <p>No guests have RSVP'd yet.</p>}

      <List
        className="s-events-card-ctr"
        items={guests}
        render={IndividualEventGuest}
      />
    </>
  );
};

const IndividualEventGuestList: React.FC = () => {
  const endTime: string = useStoreState(({ db }) => db.event?.endTime);
  const startTime: string = useStoreState(({ db }) => db.event?.startTime);

  const numGuests: number = useStoreState(
    ({ db }) => db.event?.eventGuests?.length
  );

  const hasEventFinished: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.PAST;

  return (
    <Card
      className="s-events-individual-card"
      headerTag={numGuests ? `${numGuests} Going` : null}
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
