import day from 'dayjs';
import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { IEventAttendee, IMember, IUser } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';

interface IndividualEventAttendeeProps
  extends Pick<IUser, 'email' | 'firstName' | 'id' | 'lastName'> {
  memberId: string;
}

const IndividualEventAttendee: React.FC<IndividualEventAttendeeProps> = (
  props
) => {
  const { firstName, lastName, id: userId, memberId } = props;
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => {
    showModal({ id: ModalType.MEMBER_PROFILE, metadata: memberId });
  };

  const fullName = `${firstName} ${lastName}`;

  return (
    <Button className="s-events-individual-member" onClick={onClick}>
      <ProfilePicture fontSize={16} size={36} userId={userId} />
      <p className="body--bold">{fullName}</p>
    </Button>
  );
};

const IndividualEventAttendeeListContent: React.FC = () => {
  const users: IndividualEventAttendeeProps[] = useStoreState(({ db }) => {
    return db.event?.attendees
      ?.map((attendeeId: string) => db.byAttendeeId[attendeeId])
      ?.sort((a, b) => sortObjects(a, b, 'createdAt'))
      ?.reduce((acc, attendee: IEventAttendee) => {
        if (attendee.member) {
          const member: IMember = db.byMemberId[attendee.member];
          const user: IUser = db.byUserId[member.user];
          return [...acc, { ...user, memberId: member.id }];
        }

        return [...acc, { ...attendee }];
      }, []);
  });

  return (
    <>
      {!users?.length && <p>No guests attended.</p>}

      <List
        Item={(user: IndividualEventAttendeeProps) => (
          <IndividualEventAttendee key={user?.email} {...user} />
        )}
        className="s-events-card-ctr"
        items={users}
      />
    </>
  );
};

const IndividualEventGuestList: React.FC = () => {
  const endTime = useStoreState(({ db }) => db.event?.endTime);
  const numAttendees = useStoreState(({ db }) => db.event?.attendees?.length);

  return (
    <Card
      className="s-events-individual-card"
      headerTag={numAttendees ? `${numAttendees} Attended` : null}
      show={day().isAfter(day(endTime))}
      title="Attendees"
    >
      <ListStore.Provider>
        <IndividualEventAttendeeListContent />
      </ListStore.Provider>
    </Card>
  );
};

export default IndividualEventGuestList;
