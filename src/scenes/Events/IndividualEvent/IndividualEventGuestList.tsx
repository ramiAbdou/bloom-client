import day from 'dayjs';
import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import MemberProfileModal from '@modals/MemberProfile/MemberProfile';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { IEventGuest, IMember, IUser } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx, sortObjects } from '@util/util';

interface IndividualEventGuestProps
  extends Pick<
    IUser,
    'email' | 'firstName' | 'id' | 'lastName' | 'pictureUrl'
  > {
  memberId: string;
}

const IndividualEventGuest: React.FC<IndividualEventGuestProps> = (props) => {
  const { firstName, lastName, memberId, pictureUrl } = props;
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () =>
    memberId && showModal(`${ModalType.MEMBER_PROFILE}-${memberId}`);

  const fullName = `${firstName} ${lastName}`;

  const css = cx('s-events-individual-member', {
    's-events-individual-member--disabled': !memberId
  });

  return (
    <Button className={css} onClick={onClick}>
      <ProfilePicture
        circle
        fontSize={16}
        href={pictureUrl}
        size={36}
        {...props}
      />
      <p className="body--bold">{fullName}</p>
    </Button>
  );
};

const IndividualEventGuestListContent: React.FC = () => {
  const users: IndividualEventGuestProps[] = useStoreState(({ db }) => {
    const { byId: byGuestId } = db.entities.guests;
    const { byId: byMemberId } = db.entities.members;
    const { byId: byUserId } = db.entities.users;

    return db.event?.guests
      ?.map((guestId: string) => byGuestId[guestId])
      ?.sort((a: IEventGuest, b) => sortObjects(a, b, 'createdAt', 'DESC'))
      ?.reduce((acc, guest: IEventGuest) => {
        if (guest.member) {
          const member: IMember = byMemberId[guest.member];
          const user: IUser = byUserId[member.user];
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
              <MemberProfileModal memberId={user?.memberId} userId={user?.id} />
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

  if (day().isAfter(day(endTime))) return null;

  return (
    <Card
      className="s-events-individual-card"
      headerTag={numGuests ? `${numGuests} Going` : null}
      title="Guest List"
    >
      <IndividualEventGuestListContent />
    </Card>
  );
};

export default IndividualEventGuestList;
