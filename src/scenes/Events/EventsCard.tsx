import day from 'dayjs';
import deepequal from 'fast-deep-equal';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Card from '@containers/Card/Card';
import { IEvent } from '@store/entities';
import { useStoreState } from '@store/Store';
import { cx } from '@util/util';
import IdStore from '../../core/store/Id.store';
import EventsAspectBackground from './EventsAspectBackground';
import EventsJoinButton from './EventsJoinButton';
import EventsRsvpButton from './EventsRsvpButton';
import EventsShareButton from './EventsShareButton';
import EventsViewRecordingButton from './EventsViewRecordingButton';

const EventsCardContent: React.FC<Pick<EventsCardProps, 'guest'>> = ({
  guest
}) => {
  const eventId = IdStore.useStoreState((event) => event.id);

  const {
    endTime,
    eventUrl,
    recordingUrl,
    startTime,
    title,
    videoUrl
  }: IEvent = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;
    return byEventId[eventId];
  }, deepequal);

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

const EventsCard: React.FC<EventsCardProps> = ({ guest, id, ...event }) => {
  const { push } = useHistory();
  const onClick = () => push(id);

  return (
    <IdStore.Provider runtimeModel={{ id }}>
      <Card noPadding className="s-events-card" onClick={onClick}>
        <EventsAspectBackground imageUrl={event.imageUrl} />
        <EventsCardContent guest={guest} />
      </Card>
    </IdStore.Provider>
  );
};

export default EventsCard;
