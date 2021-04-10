import day from 'dayjs';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Card from '@components/containers/Card/Card';
import { IEvent } from '@core/db/db.entities';
import useFindOne from '@core/gql/hooks/useFindOne';
import IdStore from '@core/store/Id.store';
import { IdProps } from '@util/constants';
import { cx, take } from '@util/util';
import { EventTiming, getEventTiming } from '../Events.util';
import EventsAspectBackground from '../EventsAspectBackground';
import EventsJoinButton from '../EventsJoinButton';
import EventsRsvpButton from '../EventsRsvpButton';
import EventsShareButton from '../EventsShareButton';
import EventsViewRecordingButton from '../EventsViewRecordingButton';
import EventsCardPeople from './EventsCardPeople';

const EventsCardButton: React.FC = () => {
  const eventId: string = IdStore.useStoreState((event) => event.id);

  return (
    <>
      <EventsRsvpButton eventId={eventId} />
      <EventsJoinButton eventId={eventId} />
      <EventsShareButton eventId={eventId} />
      <EventsViewRecordingButton eventId={eventId} />
    </>
  );
};

const EventsCardContent: React.FC = () => {
  const eventId: string = IdStore.useStoreState((event) => event.id);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime', 'title'],
    where: { id: eventId }
  });

  if (loading) return null;

  const isHappeningNow: boolean =
    getEventTiming(event) === EventTiming.HAPPENING_NOW;

  const isStartingSoon: boolean =
    getEventTiming(event) === EventTiming.STARTING_SOON;

  const formattedStartTime: string = take([
    [isHappeningNow, 'Happening Now'],
    [
      isStartingSoon,
      `Starting Soon @ ${day(event.startTime).format('h:mm A z')}`
    ],
    [true, day(event.startTime).format('ddd, MMM D @ h:mm A z')]
  ]);

  const css: string = cx('s-events-card-content', {
    's-events-card-content--now': isHappeningNow || isStartingSoon
  });

  return (
    <div className={css}>
      <div>
        <h5>{formattedStartTime}</h5>
        <h3>{event.title}</h3>
        <EventsCardPeople />
      </div>

      <EventsCardButton />
    </div>
  );
};

const EventsCard: React.FC<IdProps> = ({ id: eventId }) => {
  const { push } = useHistory();
  const onClick = () => push(eventId);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['imageUrl'],
    where: { id: eventId }
  });

  if (loading) return null;

  return (
    <IdStore.Provider runtimeModel={{ id: eventId }}>
      <Card noPadding className="s-events-card" onClick={onClick}>
        <EventsAspectBackground imageUrl={event.imageUrl} />
        <EventsCardContent />
      </Card>
    </IdStore.Provider>
  );
};

export default EventsCard;
