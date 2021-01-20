import day from 'dayjs';
import { RenderComponentProps } from 'masonic';
import React from 'react';

import Button from '@atoms/Button';
import Card from '@containers/Card/Card';
import { IEvent } from '@store/entities';
import { takeFirst } from '@util/util';
import EventCardStore from './EventCard.store';

const EventsCardBackground: React.FC = () => {
  const imageUrl = EventCardStore.useStoreState((event) => event.imageUrl);

  const body = takeFirst([
    [imageUrl, <img alt="Profile Avatar" src={imageUrl} />],
    [!imageUrl, <div />]
  ]);

  return <div className="s-events-card-bg">{body}</div>;
};

const EventsCardButton: React.FC = () => {
  return (
    <Button fill primary>
      RSVP
    </Button>
  );
};

const EventsCardContent: React.FC = () => {
  const startTime = EventCardStore.useStoreState((event) => event.startTime);
  const title = EventCardStore.useStoreState((event) => event.title);

  return (
    <div className="s-events-card-content">
      <h5>{day(startTime).format('ddd, MMM D @ hA z')}</h5>
      <h3>{title}</h3>
      <EventsCardButton />
    </div>
  );
};

const EventsCard: React.FC<RenderComponentProps<IEvent>> = ({ data }) => {
  return (
    <EventCardStore.Provider runtimeModel={data}>
      <Card className="s-events-card" onClick={() => null}>
        <EventsCardBackground />
        <EventsCardContent />
      </Card>
    </EventCardStore.Provider>
  );
};

export default EventsCard;
