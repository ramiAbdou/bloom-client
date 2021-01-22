import React from 'react';

import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import ProfilePicture from '@molecules/ProfilePicture';
import { IUser } from '@store/entities';
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
  const guests = useStoreState(({ db }) => db.event?.guests);
  const numGuests = guests?.length;

  return (
    <>
      {!numGuests && <p>No guests have RSVP'd yet.</p>}

      <div>
        <IndividualEventGuest
          firstName="Rami"
          lastName="Abdou"
          pictureUrl={null}
        />
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
