import day from 'dayjs';
import { RenderComponentProps } from 'masonic';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Card from '@containers/Card/Card';
import { IEvent } from '@store/entities';
import { cx } from '@util/util';
import EventStore from './Event.store';
import EventJoinButton from './EventJoinButton';
import EventRsvpButton from './EventRsvpButton';
import EventsAspectBackground from './EventsAspectBackground';
import EventShareButton from './EventShareButton';
import EventViewRecordingButton from './EventViewRecordingButton';

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
      <EventRsvpButton show={!guest} {...timeProps} />
      <EventJoinButton eventId={eventId} videoUrl={videoUrl} {...timeProps} />
      <EventShareButton
        href={eventUrl}
        show={!!guest && !isHappeningNow}
        {...timeProps}
      />
      <EventViewRecordingButton href={recordingUrl} />
    </div>
  );
};

interface EventsCardProps extends RenderComponentProps<IEvent> {
  guest?: boolean;
}

const EventsCard: React.FC<EventsCardProps> = ({ data, guest }) => {
  const { push } = useHistory();
  const onClick = () => push(data?.id);

  return (
    <EventStore.Provider runtimeModel={data}>
      <Card noPadding className="s-events-card" onClick={onClick}>
        <EventsAspectBackground imageUrl={data.imageUrl} />
        <EventsCardContent guest={guest} />
      </Card>
    </EventStore.Provider>
  );
};

export default EventsCard;
