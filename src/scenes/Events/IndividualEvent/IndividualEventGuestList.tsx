import React from 'react';

import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import ProfilePicture from '@molecules/ProfilePicture';
import { IEventGuest, IMember, IUser } from '@store/entities';
import { useStoreState } from '@store/Store';

const IndividualEventGuest: React.FC<
  Pick<IUser, 'firstName' | 'lastName' | 'pictureUrl'>
> = (props) => {
  const { firstName, lastName, pictureUrl } = props;
  const fullName = `${firstName} ${lastName}`;

  return (
    <Row className="s-events-individual-guest">
      <ProfilePicture
        circle
        fontSize={16}
        href={pictureUrl}
        size={36}
        {...props}
      />
      <p className="body--bold">{fullName}</p>
    </Row>
  );
};

const IndividualEventGuestListContent: React.FC = () => {
  const users: IUser[] = useStoreState(({ db }) => {
    const { byId: byGuestsId } = db.entities.guests;
    const { byId: byMembersId } = db.entities.members;
    const { byId: byUsersId } = db.entities.users;

    return db.event?.guests
      ?.map((guestId: string) => byGuestsId[guestId])
      ?.map((guest: IEventGuest) => byMembersId[guest.member])
      ?.map((member: IMember) => byUsersId[member.user]);
  });

  return (
    <>
      {!users?.length && <p>No guests have RSVP'd yet.</p>}

      <div>
        {users.map((user: IUser) => {
          return <IndividualEventGuest {...user} />;
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
