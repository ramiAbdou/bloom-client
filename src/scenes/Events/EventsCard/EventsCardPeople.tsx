import React from 'react';

import Row from '@components/containers/Row/Row';
import { IEvent, IEventAttendee, IEventGuest } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import IdStore from '@store/Id.store';

interface EventsCardPictureId {
  memberId?: string;
  supporterId?: string;
}

interface EventsCardPersonPictures {
  ids?: EventsCardPictureId[];
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

  const { endTime, eventAttendees, eventGuests, startTime } = useFindOne(
    IEvent,
    {
      fields: [
        'endTime',
        'eventAttendees.id',
        'eventAttendees.member.id',
        'eventAttendees.supporter.id',
        'eventGuests.id',
        'eventGuests.member.id',
        'eventGuests.supporter.id',
        'startTime'
      ],
      where: { id: eventId }
    }
  );

  const isPast: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.PAST;

  const ids: EventsCardPictureId[] = isPast
    ? eventAttendees.slice(0, 3).map((eventAttendee: IEventAttendee) => {
        return {
          memberId: eventAttendee.member?.id,
          supporterId: eventAttendee.supporter?.id
        };
      })
    : eventGuests.slice(0, 3).map((eventGuest: IEventGuest) => {
        return {
          memberId: eventGuest.member?.id,
          supporterId: eventGuest.supporter?.id
        };
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
