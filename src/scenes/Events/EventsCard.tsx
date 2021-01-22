import day from 'dayjs';
import { RenderComponentProps } from 'masonic';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button';
import Card from '@containers/Card/Card';
import { IEvent } from '@store/entities';
import { takeFirst } from '@util/util';
import EventStore from './Event.store';
import EventRsvpButton from './EventRsvpButton';
import EventShareButton from './EventShareButton';

const EventsCardBackground: React.FC = () => {
  const imageUrl = EventStore.useStoreState((event) => event.imageUrl);

  const body = takeFirst([
    [imageUrl, <img alt="Profile Avatar" src={imageUrl} />],
    [!imageUrl, <div />]
  ]);

  return <div className="s-events-card-bg">{body}</div>;
};

const EventsCardViewRecordingButton: React.FC = () => {
  const recordingUrl = EventStore.useStoreState((event) => event?.recordingUrl);

  return (
    <Button fill secondary href={recordingUrl} show={!!recordingUrl}>
      View Recording
    </Button>
  );
};

const EventsCardContent: React.FC<Pick<EventsCardProps, 'guest'>> = ({
  guest
}) => {
  const endTime = EventStore.useStoreState((event) => event.endTime);
  const eventUrl = EventStore.useStoreState((event) => event.eventUrl);
  const startTime = EventStore.useStoreState((event) => event.startTime);
  const title = EventStore.useStoreState((event) => event.title);
  const formattedStartTime = day(startTime).format('ddd, MMM D @ hA z');

  return (
    <div className="s-events-card-content">
      <h5>{formattedStartTime}</h5>
      <h3>{title}</h3>
      <EventRsvpButton show={!guest} />
      <EventShareButton endTime={endTime} href={eventUrl} show={guest} />
      <EventsCardViewRecordingButton />
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
      <Card className="s-events-card" onClick={onClick}>
        <EventsCardBackground />
        <EventsCardContent guest={guest} />
      </Card>
    </EventStore.Provider>
  );
};

export default EventsCard;
