import day from 'dayjs';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Card from '@containers/Card/Card';
import { IEvent } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
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

  const endTime: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.endTime;
  });

  const startTime: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.startTime;
  });

  const title: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.title;
  });

  const isHappeningNow: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.HAPPENING_NOW;

  const isStartingSoon: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.STARTING_SOON;

  const formattedStartTime: string = take([
    [isHappeningNow, 'Happening Now'],
    [isStartingSoon, `Starting Soon @ ${day(startTime).format('h:mm A z')}`],
    [true, day(startTime).format('ddd, MMM D @ h:mm A z')]
  ]);

  const css: string = cx('s-events-card-content', {
    's-events-card-content--now': isHappeningNow || isStartingSoon
  });

  return (
    <div className={css}>
      <div>
        <h5>{formattedStartTime}</h5>
        <h3>{title}</h3>
        <EventsCardPeople />
      </div>

      <EventsCardButton />
    </div>
  );
};

const EventsCard: React.FC<IdProps> = ({ id }) => {
  const imageUrl = useStoreState(({ db }) => db.byEventId[id]?.imageUrl);
  const { push } = useHistory();
  const onClick = () => push(id);

  return (
    <IdStore.Provider runtimeModel={{ id }}>
      <Card noPadding className="s-events-card" onClick={onClick}>
        <EventsAspectBackground imageUrl={imageUrl} />
        <EventsCardContent />
      </Card>
    </IdStore.Provider>
  );
};

export default EventsCard;
