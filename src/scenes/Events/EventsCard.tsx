import React from 'react';
import { useHistory } from 'react-router-dom';

import { gql } from '@apollo/client';
import Card from '@components/containers/Card/Card';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import EventsAspectBackground from './EventsAspectBackground';
// import EventsJoinButton from './EventsJoinButton';
// import EventsRsvpButton from './EventsRsvpButton';
// import EventsShareButton from './EventsShareButton';
// import EventsViewRecordingButton from './EventsViewRecordingButton';
import EventsCardHeader from './EventsCardHeader';

// const EventsCardButton: React.FC = () => {
//   const eventId: string = IdStore.useStoreState((event) => event.id);

//   return (
//     <>
//       <EventsRsvpButton eventId={eventId} />
//       <EventsJoinButton eventId={eventId} />
//       <EventsShareButton eventId={eventId} />
//       <EventsViewRecordingButton eventId={eventId} />
//     </>
//   );
// };

// const EventsCardContent: React.FC = () => {
//   const eventId: string = IdStore.useStoreState((event) => event.id);

//   return (
//     <div className="s-events-card-content">
//       <EventsCardHeader data={event} />

//       {/* <EventsCardButton /> */}
//     </div>
//   );
// };

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
      </div>
      {/* <EventsCardContent /> */}
    </Card>
  );
};

EventsCard.fragment = gql`
  fragment EventsCardFragment on events {
    ...EventsCardHeaderFragment
  }
  ${EventsCardHeader.fragment}
`;

export default EventsCard;
