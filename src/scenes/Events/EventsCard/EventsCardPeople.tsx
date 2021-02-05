import day from 'dayjs';
import React from 'react';

import Row from '@containers/Row/Row';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import {
  IEvent,
  IEventAttendee,
  IEventGuest,
  IMember,
  IUser
} from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';

interface EventsCardPersonPictures {
  users?: IUser[];
}

const EventsCardPersonPictures: React.FC<EventsCardPersonPictures> = ({
  users
}) => {
  return (
    <Row>
      {users?.map((user: IUser) => {
        return (
          <ProfilePicture
            key={user.id}
            circle
            fontSize={12}
            href={user?.pictureUrl}
            size={24}
            {...user}
          />
        );
      })}
    </Row>
  );
};

const EventsCardPeople: React.FC = () => {
  const eventId = IdStore.useStoreState((event) => event.id);

  const isPast: boolean = useStoreState(({ db }) => {
    const endTime = db.byEventId[eventId]?.endTime;
    return day().isAfter(day(endTime));
  });

  const users: IUser[] = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    const people = isPast ? event?.attendees : event?.guests;

    return people
      ?.map((id: string) => (isPast ? db.byAttendeeId[id] : db.byGuestId[id]))
      ?.reduce((acc, person: IEventGuest | IEventAttendee) => {
        if (person.member) {
          const member: IMember = db.byMemberId[person.member];
          const user: IUser = db.byUserId[member.user];
          return [...acc, { ...user, memberId: member.id }];
        }

        return [...acc, { ...person }];
      }, [])
      ?.sort((a: IUser, b: IUser) => sortObjects(a, b, 'pictureUrl', 'DESC'));
  });

  return (
    <Row className="s-events-card-people" show={!!users?.length}>
      <EventsCardPersonPictures users={users?.slice(0, 3)} />
      <p className="meta">
        {isPast
          ? `${users?.length} people attended`
          : `${users?.length} people going`}
      </p>
    </Row>
  );
};

export default EventsCardPeople;
