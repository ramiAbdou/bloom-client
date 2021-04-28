import React from 'react';
import { memberIdVar } from 'src/App.reactive';

import { gql, useReactiveVar } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import { ComponentWithFragments } from '@util/constants';
import { IEvent, IEventGuest } from '@util/constants.entities';
import { EventTiming, getEventTiming } from './Events.util';
import EventsJoinButton from './EventsJoinButton';
import EventsRsvpButton from './EventsRsvpButton';
import EventsShareButton from './EventsShareButton';
import EventsViewRecordingButton from './EventsViewRecordingButton';
import IndividualEventAddRecordingButton from './IndividualEventAddRecordingButton';
import IndividualEventEditEventButton from './IndividualEventEditEventButton';

/**
 * Returns action container that contains either of the following options:
 * - RSVP and Share Event (Before Event)
 * - Share Event (Before Event)
 * - Join and Share Event (Current Event)
 * - Add Event Recording (Past Event and Admin)
 * - View Event Recording (Past Event)
 */
const IndividualEventMainInformationButtonRow: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const memberId: string = useReactiveVar(memberIdVar);

  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isUpcoming: boolean = eventTiming === EventTiming.UPCOMING;

  const isGoing: boolean = event.eventGuests.some(
    (eventGuest: IEventGuest) => eventGuest.member?.id === memberId
  );

  return (
    <Row className="mt-auto" equal={!isGoing && isUpcoming} spacing="xs">
      <EventsRsvpButton large data={event} />
      <EventsJoinButton large data={event} />
      <IndividualEventEditEventButton data={event} />
      <EventsShareButton large data={event} />
      <EventsViewRecordingButton large data={event} />
      <IndividualEventAddRecordingButton data={event} />
    </Row>
  );
};

IndividualEventMainInformationButtonRow.fragment = gql`
  fragment IndividualEventMainInformationButtonRowFragment on events {
    ...IndividualEventAddRecordingButtonFragment
    ...IndividualEventEditEventButtonFragment
  }
  ${IndividualEventAddRecordingButton.fragment}
  ${IndividualEventEditEventButton.fragment}
`;

export default IndividualEventMainInformationButtonRow;
