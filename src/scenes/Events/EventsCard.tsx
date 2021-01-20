import day from 'dayjs';
import { RenderComponentProps } from 'masonic';
import React from 'react';

import Button from '@atoms/Button';
import Card from '@containers/Card/Card';
import useMutation from '@hooks/useMutation';
import { IEvent } from '@store/entities';
import { Schema } from '@store/schema';
import { takeFirst } from '@util/util';
import EventCardStore from './EventCard.store';
import { CREATE_EVENT_GUEST, CreateEventGuestArgs } from './Events.gql';

const EventsCardBackground: React.FC = () => {
  const imageUrl = EventCardStore.useStoreState((event) => event.imageUrl);

  const body = takeFirst([
    [imageUrl, <img alt="Profile Avatar" src={imageUrl} />],
    [!imageUrl, <div />]
  ]);

  return <div className="s-events-card-bg">{body}</div>;
};

const EventsCardButton: React.FC = () => {
  const eventId = EventCardStore.useStoreState((event) => event.id);

  const [createEventGuest] = useMutation<any, CreateEventGuestArgs>({
    name: 'createEventGuest',
    query: CREATE_EVENT_GUEST,
    schema: Schema.MEMBER,
    variables: { eventId }
  });

  const onClick = () => createEventGuest();

  return (
    <Button fill primary onClick={onClick}>
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
