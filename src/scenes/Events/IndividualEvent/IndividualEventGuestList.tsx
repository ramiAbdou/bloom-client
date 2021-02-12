import day from 'dayjs';
import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { IEventGuest, IMember, IUser } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx, sortObjects } from '@util/util';

interface IndividualEventGuestProps
  extends Pick<IUser, 'email' | 'firstName' | 'id' | 'lastName'> {
  memberId: string;
}

const IndividualEventGuest: React.FC<IndividualEventGuestProps> = (props) => {
  const { firstName, lastName, id: userId, memberId } = props;
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);

  const onClick = () => {
    if (isAuthenticated && memberId) {
      showModal({ id: ModalType.MEMBER_PROFILE, metadata: memberId });
    }
  };

  const fullName = `${firstName} ${lastName}`;

  const css = cx('s-events-individual-member', {
    's-events-individual-member--disabled': !isAuthenticated
  });

  return (
    <Button className={css} onClick={onClick}>
      <ProfilePicture fontSize={16} size={36} userId={userId} />
      <p className="body--bold">{fullName}</p>
    </Button>
  );
};

const IndividualEventGuestListContent: React.FC = () => {
  const users: IndividualEventGuestProps[] = useStoreState(({ db }) => {
    return db.event?.guests
      ?.map((guestId: string) => db.byGuestId[guestId])
      ?.sort((a: IEventGuest, b) => sortObjects(a, b, 'createdAt'))
      ?.reduce((acc, guest: IEventGuest) => {
        if (guest.member) {
          const member: IMember = db.byMemberId[guest.member];
          const user: IUser = db.byUserId[member.user];
          return [...acc, { ...user, memberId: member.id }];
        }

        return [...acc, { ...guest }];
      }, []);
  });

  return (
    <>
      {!users?.length && <p>No guests have RSVP'd yet.</p>}

      <div>
        {users?.map((user: IndividualEventGuestProps) => {
          return (
            <React.Fragment key={user?.email}>
              <IndividualEventGuest key={user?.id} {...user} />
            </React.Fragment>
          );
        })}
      </div>
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
      <IndividualEventGuestListContent />
    </Card>
  );
};

export default IndividualEventGuestList;
