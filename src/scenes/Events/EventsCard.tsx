import day from 'dayjs';
import { RenderComponentProps } from 'masonic';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button';
import { ShowProps } from '@constants';
import Card from '@containers/Card/Card';
import useMutation from '@hooks/useMutation';
import { IEvent } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import EventStore from './Event.store';
import { CREATE_EVENT_GUEST, CreateEventGuestArgs } from './Events.gql';

const EventsCardBackground: React.FC = () => {
  const imageUrl = EventStore.useStoreState((event) => event.imageUrl);

  const body = takeFirst([
    [imageUrl, <img alt="Profile Avatar" src={imageUrl} />],
    [!imageUrl, <div />]
  ]);

  return <div className="s-events-card-bg">{body}</div>;
};

const EventsCardRSVPButton: React.FC<ShowProps> = ({ show }) => {
  const eventId = useStoreState(({ db }) => db.event?.id);

  const canRsvp = useStoreState(({ db }) => {
    return day.utc().isBefore(db.event?.endTime);
  });

  const [createEventGuest] = useMutation<any, CreateEventGuestArgs>({
    name: 'createEventGuest',
    query: CREATE_EVENT_GUEST,
    schema: Schema.EVENT_GUEST,
    variables: { eventId }
  });

  if (!show) return null;

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    createEventGuest();
  };

  return (
    <Button fill primary show={canRsvp} onClick={onClick}>
      RSVP
    </Button>
  );
};

const EventsCardViewRecordingButton: React.FC = () => {
  const recordingUrl = EventStore.useStoreState((event) => event?.recordingUrl);

  return (
    <Button fill secondary href={recordingUrl} show={!!recordingUrl}>
      View Recording
    </Button>
  );
};

const EventsCardShareLinkButton: React.FC<ShowProps> = ({ show }) => {
  const eventUrl = EventStore.useStoreState((event) => event.eventUrl);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  if (!show) return null;

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(eventUrl);
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
  const startTime = EventStore.useStoreState((event) => event.startTime);
  const title = EventStore.useStoreState((event) => event.title);
  const formattedStartTime = day(startTime).format('ddd, MMM D @ hA z');

  return (
    <div className="s-events-card-content">
      <h5>{formattedStartTime}</h5>
      <h3>{title}</h3>
      <EventsCardRSVPButton show={!guest} />
      <EventsCardShareLinkButton show={guest} />
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
