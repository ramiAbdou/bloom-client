import React from 'react';

import Row from '@containers/Row/Row';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
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
  const eventId: string = IdStore.useStoreState((event) => event.id);

  const endTime: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.endTime;
  });

  const startTime: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.startTime;
  });

  const isPast: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.PAST;

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
