import day from 'dayjs';
import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { IEventGuest, IMember, ISupporter } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import { cx, sortObjects } from '@util/util';

interface IndividualEventGuestProps {
  guestId?: string;
}

const IndividualEventGuest: React.FC<IndividualEventGuestProps> = (props) => {
  const { guestId } = props;

  const memberId: string = useStoreState(({ db }) => {
    const guest: IEventGuest = db.byGuestId[guestId];
    return guest?.member;
  });

  const fullName: string = useStoreState(({ db }) => {
    const guest: IEventGuest = db.byGuestId[guestId];
    const member: IMember = db.byMemberId[guest?.member];
    const supporter: ISupporter = db.bySupporterId[guest?.supporter];
    const firstName = member?.firstName ?? supporter?.firstName;
    const lastName = member?.lastName ?? supporter?.lastName;
    return `${firstName} ${lastName}`;
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const isMember = useStoreState(({ db }) => db.isMember);

  const onClick = () => {
    if (isMember && memberId) {
      showModal({ id: ModalType.PROFILE, metadata: memberId });
    }
  };

  const css: string = cx('s-events-individual-member', {
    's-events-individual-member--disabled': !isMember
  });

  return (
    <Button className={css} onClick={onClick}>
      <ProfilePicture fontSize={16} memberId={memberId} size={36} />
      <p className="body--bold">{fullName}</p>
    </Button>
  );
};

const IndividualEventGuestListContent: React.FC = () => {
  const guests: IndividualEventGuestProps[] = useStoreState(({ db }) =>
    db.event?.guests
      ?.map((guestId: string) => db.byGuestId[guestId])
      ?.sort((a: IEventGuest, b) => sortObjects(a, b, 'createdAt'))
      ?.reduce((acc, guest: IEventGuest) => [...acc, { guestId: guest.id }], [])
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
  const endTime = useStoreState(({ db }) => db.event?.endTime);
  const numGuests = useStoreState(({ db }) => db.event?.guests?.length);

  return (
    <Card
      className="s-events-individual-card"
      headerTag={numGuests ? `${numGuests} Going` : null}
      show={day().isBefore(day(endTime))}
      title="Guest List"
    >
      <ListStore.Provider>
        <IndividualEventGuestListContent />
      </ListStore.Provider>
    </Card>
  );
};

export default IndividualEventGuestList;
