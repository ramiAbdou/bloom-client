import day from 'dayjs';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Card from '@containers/Card/Card';
import { IEvent } from '@store/entities';
import { cx } from '@util/util';
import EventStore from './Event.store';
import EventsAspectBackground from './EventsAspectBackground';
import EventsJoinButton from './EventsJoinButton';
import EventsRsvpButton from './EventsRsvpButton';
import EventsShareButton from './EventsShareButton';
import EventsViewRecordingButton from './EventsViewRecordingButton';

const EventsCardContent: React.FC<Pick<EventsCardProps, 'guest'>> = ({
  guest
}) => {
  const endTime = EventStore.useStoreState((event) => event.endTime);
  const eventUrl = EventStore.useStoreState((event) => event.eventUrl);
  const eventId = EventStore.useStoreState((event) => event.id);
  const recordingUrl = EventStore.useStoreState((event) => event.recordingUrl);
  const startTime = EventStore.useStoreState((event) => event.startTime);
  const title = EventStore.useStoreState((event) => event.title);
  const videoUrl = EventStore.useStoreState((event) => event.videoUrl);

  const timeProps: Pick<IEvent, 'endTime' | 'startTime'> = {
    endTime,
    startTime
  };

  const isHappeningNow =
    day.utc().isAfter(day.utc(startTime)) &&
    day.utc().isBefore(day.utc(endTime));

  const formattedStartTime = isHappeningNow
    ? 'Happening Now'
    : day(startTime).format('ddd, MMM D @ hA z');

  const css = cx('s-events-card-content', {
    's-events-card-content--now': isHappeningNow
  });

  return (
    <div className={css}>
      <h5>{formattedStartTime}</h5>
      <h3>{title}</h3>
      <EventsRsvpButton show={!guest} {...timeProps} />
      <EventsJoinButton eventId={eventId} videoUrl={videoUrl} {...timeProps} />
      <EventsShareButton
        href={eventUrl}
        show={!!guest && !isHappeningNow}
        startTime={startTime}
      />
      <EventsViewRecordingButton href={recordingUrl} />
    </div>
  );
};

interface EventsCardProps extends IEvent {
  guest?: boolean;
}

const EventsCard: React.FC<EventsCardProps> = ({ guest, ...event }) => {
  const { push } = useHistory();
  const onClick = () => push(event?.id);

  return (
    <EventStore.Provider runtimeModel={event}>
      <Card noPadding className="s-events-card" onClick={onClick}>
        <EventsAspectBackground imageUrl={event.imageUrl} />
        <EventsCardContent guest={guest} />
      </Card>
    </EventStore.Provider>
  );
};

export default EventsCard;
