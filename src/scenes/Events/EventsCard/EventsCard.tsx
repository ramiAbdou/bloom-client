import day from 'dayjs';
import deepequal from 'fast-deep-equal';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { IdProps } from '@constants';
import Card from '@containers/Card/Card';
import { IEvent } from '@store/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { cx } from '@util/util';
import EventsAspectBackground from '../EventsAspectBackground';
import EventsJoinButton from '../EventsJoinButton';
import EventsRsvpButton from '../EventsRsvpButton';
import EventsShareButton from '../EventsShareButton';
import EventsViewRecordingButton from '../EventsViewRecordingButton';
import EventsCardPeople from './EventsCardPeople';

const EventsCardButton: React.FC<Pick<EventsCardProps, 'guest'>> = ({
  guest
}) => {
  const eventId = IdStore.useStoreState((event) => event.id);

  const {
    endTime,
    eventUrl,
    recordingUrl,
    startTime,
    videoUrl
  }: IEvent = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;
    return byEventId[eventId];
  }, deepequal);

  const isHappeningNow =
    day.utc().isAfter(day.utc(startTime)) &&
    day.utc().isBefore(day.utc(endTime));

  const timeProps: Pick<IEvent, 'endTime' | 'startTime'> = {
    endTime,
    startTime
  };

  return (
    <>
      <EventsRsvpButton show={!guest} {...timeProps} />
      <EventsJoinButton eventId={eventId} videoUrl={videoUrl} {...timeProps} />
      <EventsShareButton
        href={eventUrl}
        show={!!guest && !isHappeningNow}
        startTime={startTime}
      />
      <EventsViewRecordingButton href={recordingUrl} />
    </>
  );
};

const EventsCardContent: React.FC<Pick<EventsCardProps, 'guest'>> = ({
  guest
}) => {
  const eventId = IdStore.useStoreState((event) => event.id);

  const { endTime, startTime, title }: IEvent = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;
    return byEventId[eventId];
  }, deepequal);

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
      <div>
        <h5>{formattedStartTime}</h5>
        <h3>{title}</h3>
        <EventsCardPeople />
      </div>

      <EventsCardButton guest={guest} />
    </div>
  );
};

interface EventsCardProps extends IdProps {
  guest?: boolean;
}

const EventsCard: React.FC<EventsCardProps> = ({ guest, id }) => {
  const imageUrl = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;
    return byEventId[id]?.imageUrl;
  });

  const { push } = useHistory();
  const onClick = () => push(id);

  return (
    <IdStore.Provider runtimeModel={{ id }}>
      <Card noPadding className="s-events-card" onClick={onClick}>
        <EventsAspectBackground imageUrl={imageUrl} />
        <EventsCardContent guest={guest} />
      </Card>
    </IdStore.Provider>
  );
};

export default EventsCard;
