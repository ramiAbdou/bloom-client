import React from 'react';
import { useHistory } from 'react-router-dom';

import { gql } from '@apollo/client';
import Card from '@components/containers/Card/Card';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import EventsAspectBackground from './EventsAspectBackground';
import EventsCardHeader from './EventsCardHeader';
// import EventsJoinButton from './EventsJoinButton';
import EventsRsvpButton from './EventsRsvpButton';
// import EventsShareButton from './EventsShareButton';
// import EventsViewRecordingButton from './EventsViewRecordingButton';

const EventsCard: ComponentWithFragments<IEvent> = ({ data: event }) => {
  const { push } = useHistory();

  const onClick = (): void => {
    push(event.id);
  };

  return (
    <Card noPadding className="s-events-card" onClick={onClick}>
      <EventsAspectBackground imageUrl={event?.imageUrl} />

      <div className="s-events-card-content">
        <EventsCardHeader data={event} />
        <EventsRsvpButton data={event} />
        {/* <EventsJoinButton eventId={event.id} />
        <EventsShareButton eventId={event.id} />
        <EventsViewRecordingButton eventId={event.id} /> */}
      </div>
    </Card>
  );
};

EventsCard.fragment = gql`
  fragment EventsCardFragment on events {
    ...EventsCardHeaderFragment
    ...EventsRsvpButtonFragment
  }
  ${EventsCardHeader.fragment}
  ${EventsRsvpButton.fragment}
`;

export default EventsCard;
