import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import MemberProfileModal from '@modals/MemberProfile/MemberProfile';
import ProfilePicture from '@molecules/ProfilePicture';
import { IEventGuest, IMember, IUser } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { sortByDescendingCreatedAt } from '@util/util';

interface IndividualEventGuestProps
  extends Pick<IUser, 'firstName' | 'id' | 'lastName' | 'pictureUrl'> {
  memberId: string;
}

const IndividualEventGuest: React.FC<IndividualEventGuestProps> = (props) => {
  const { firstName, lastName, memberId, pictureUrl } = props;
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => showModal(`${ModalType.MEMBER_PROFILE}-${memberId}`);
  const fullName = `${firstName} ${lastName}`;

  return (
    <Button className="s-events-individual-guest" onClick={onClick}>
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
    const { byId: byGuestsId } = db.entities.guests;
    const { byId: byMembersId } = db.entities.members;
    const { byId: byUsersId } = db.entities.users;

    return db.event?.guests
      ?.map((guestId: string) => byGuestsId[guestId])
      ?.sort(sortByDescendingCreatedAt)
      ?.map((guest: IEventGuest) => byMembersId[guest.member])
      ?.map((member: IMember) => ({
        ...byUsersId[member.user],
        memberId: member.id
      }));
  });

  return (
    <>
      {!users?.length && <p>No guests have RSVP'd yet.</p>}

      <div>
        {users?.map((user: IndividualEventGuestProps) => {
          return (
            <React.Fragment key={user?.id}>
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
  const numGuests = useStoreState(({ db }) => db.event?.guests?.length);

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
