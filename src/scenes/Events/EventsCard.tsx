import day from 'dayjs';
import { RenderComponentProps } from 'masonic';
import React from 'react';

import Button from '@atoms/Button';
import { ShowProps } from '@constants';
import Card from '@containers/Card/Card';
import useMutation from '@hooks/useMutation';
import { IEvent } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
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

const EventsCardRSVPButton: React.FC<ShowProps> = ({ show }) => {
  const eventId = EventCardStore.useStoreState((event) => event.id);

  const [createEventGuest] = useMutation<any, CreateEventGuestArgs>({
    name: 'createEventGuest',
    query: CREATE_EVENT_GUEST,
    schema: Schema.EVENT_GUEST,
    variables: { eventId }
  });

  if (!show) return null;

  const onClick = () => createEventGuest();

  return (
    <Button fill primary onClick={onClick}>
      RSVP
    </Button>
  );
};

const EventsCardShareLinkButton: React.FC<ShowProps> = ({ show }) => {
  const videoUrl = EventCardStore.useStoreState((event) => event.videoUrl);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  if (!show) return null;

  const onClick = () => {
    navigator.clipboard.writeText(videoUrl);
    showToast({ message: 'Event link copied to clipboard.' });
  };

  return (
    <Button fill secondary onClick={onClick}>
      Share Event
    </Button>
  );
};

const EventsCardContent: React.FC<Pick<EventsCardProps, 'guest'>> = ({
  guest
}) => {
  const startTime = EventCardStore.useStoreState((event) => event.startTime);
  const title = EventCardStore.useStoreState((event) => event.title);
  const formattedStartTime = day(startTime).format('ddd, MMM D @ hA z');

  return (
    <div className="s-events-card-content">
      <h5>{formattedStartTime}</h5>
      <h3>{title}</h3>
      <EventsCardRSVPButton show={!guest} />
      <EventsCardShareLinkButton show={guest} />
    </div>
  );
};

interface EventsCardProps extends RenderComponentProps<IEvent> {
  guest?: boolean;
}

const EventsCard: React.FC<EventsCardProps> = ({ data, guest }) => {
  return (
    <EventCardStore.Provider runtimeModel={data}>
      <Card className="s-events-card" onClick={() => null}>
        <EventsCardBackground />
        <EventsCardContent guest={guest} />
      </Card>
    </EventCardStore.Provider>
  );
};

export default EventsCard;
