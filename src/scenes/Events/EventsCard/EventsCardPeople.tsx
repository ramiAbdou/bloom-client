import day from 'dayjs';
import React from 'react';

import Row from '@containers/Row/Row';
import ProfilePicture from '@molecules/ProfilePicture';
import {
  IEvent,
  IEventAttendee,
  IEventGuest,
  IMember,
  IUser
} from '@store/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';

interface EventsCardPersonPictures {
  users?: Partial<IUser>[];
}

const EventsCardPersonPictures: React.FC<EventsCardPersonPictures> = ({
  users
}) => {
  return (
    <Row>
      {users?.map((user: IUser) => {
        return (
          <ProfilePicture
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
    const { byId: byEventId } = db.entities.events;
    return day.utc().isAfter(day.utc(byEventId[eventId]?.endTime));
  });

  const users: Pick<
    IUser,
    'firstName' | 'lastName' | 'pictureUrl'
  >[] = useStoreState(({ db }) => {
    const { byId: byAttendeeId } = db.entities.attendees;
    const { byId: byEventId } = db.entities.events;
    const { byId: byGuestId } = db.entities.guests;
    const { byId: byMemberId } = db.entities.members;
    const { byId: byUserId } = db.entities.users;

    const event: IEvent = byEventId[eventId];
    const people = isPast ? event?.attendees : event?.guests;

    return people
      ?.map((id: string) => (isPast ? byAttendeeId[id] : byGuestId[id]))
      ?.map((element: IEventGuest | IEventAttendee) => {
        return byMemberId[element?.member];
      })
      ?.map((member: IMember) => byUserId[member.user])
      ?.sort((a: IUser) => Number(!!a.pictureUrl));
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
