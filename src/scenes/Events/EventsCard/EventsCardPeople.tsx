import day from 'dayjs';
import React from 'react';

import Row from '@containers/Row/Row';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import {
  IEvent,
  IEventAttendee,
  IEventGuest,
  IMember
} from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';

interface EventsCardPersonPictures {
  userIds?: string[];
}

const EventsCardPersonPictures: React.FC<EventsCardPersonPictures> = ({
  userIds
}) => {
  return (
    <Row>
      {userIds?.map((userId: string) => {
        return (
          <ProfilePicture
            key={userId}
            fontSize={12}
            size={24}
            userId={userId}
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

  const userIds: string[] = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    const people = isPast ? event?.attendees : event?.guests;

    return people
      ?.map((id: string) => (isPast ? db.byAttendeeId[id] : db.byGuestId[id]))
      ?.reduce((acc, person: IEventGuest | IEventAttendee) => {
        if (person.member) {
          const member: IMember = db.byMemberId[person.member];
          return [...acc, member.user];
        }

        return [...acc, person.id];
      }, []);
  });

  return (
    <Row className="s-events-card-people" show={!!userIds?.length}>
      <EventsCardPersonPictures userIds={userIds?.slice(0, 3)} />
      <p className="meta">
        {isPast
          ? `${userIds?.length} people attended`
          : `${userIds?.length} people going`}
      </p>
    </Row>
  );
};

export default EventsCardPeople;
