import day from 'dayjs';
import React from 'react';

import Row from '@containers/Row/Row';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { IEvent, IEventAttendee, IEventGuest } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';

interface EventsCardPersonPictures {
  ids?: { memberId?: string; supporterId?: string }[];
}

const EventsCardPersonPictures: React.FC<EventsCardPersonPictures> = ({
  ids
}) => (
  <Row spacing="xs">
    {ids?.map((props) => (
      <ProfilePicture
        key={props?.memberId ?? props?.supporterId}
        fontSize={12}
        size={24}
        {...props}
      />
    ))}
  </Row>
);

const EventsCardPeople: React.FC = () => {
  const eventId = IdStore.useStoreState((event) => event.id);

  const isPast: boolean = useStoreState(({ db }) => {
    const endTime = db.byEventId[eventId]?.endTime;
    return day().isAfter(day(endTime));
  });

  const ids = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    const people = isPast ? event?.attendees : event?.guests;

    return people
      ?.map((id: string) => (isPast ? db.byAttendeeId[id] : db.byGuestId[id]))
      ?.reduce(
        (acc, person: IEventGuest | IEventAttendee) => [
          ...acc,
          person.member
            ? { memberId: person.member }
            : { supporterId: person.supporter }
        ],
        []
      );
  });

  return (
    <Row className="s-events-card-people" show={!!ids?.length} spacing="xs">
      <EventsCardPersonPictures ids={ids?.slice(0, 3)} />
      <p className="meta">
        {isPast
          ? `${ids?.length} people attended`
          : `${ids?.length} people going`}
      </p>
    </Row>
  );
};

export default EventsCardPeople;
