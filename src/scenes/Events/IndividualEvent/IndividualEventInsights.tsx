import React from 'react';

import Separator from '@atoms/Separator';
import GrayCard from '@containers/Card/GrayCard';
import Row from '@containers/Row/Row';
import Section from '@containers/Section';
import { IEvent, IMember } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import SidebarHamburgerButton from '@organisms/Sidebar/SidebarHamburgerButton';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { useStoreState } from '@store/Store';

const IndividualEventInsightsAttendeesCard: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.event?.id);

  const { endTime, eventAttendees, startTime } = useFindOne(IEvent, {
    fields: ['endTime', 'eventAttendees.id', 'startTime'],
    where: { id: eventId }
  });

  const attendeesCount: number = eventAttendees?.length;

  const isUpcoming: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.UPCOMING;

  return (
    <GrayCard
      label="# of Attendees"
      show={!isUpcoming}
      value={attendeesCount ?? 0}
    />
  );
};

const IndividualEventInsightsGuestsCard: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.event?.id);

  const { eventGuests } = useFindOne(IEvent, {
    fields: ['endTime', 'eventGuests.id', 'startTime'],
    where: { id: eventId }
  });

  const guestsCount: number = eventGuests?.length;

  return <GrayCard label="# of RSVPs" value={guestsCount ?? 0} />;
};

const IndividualEventInsightsWatchesCard: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.event?.id);

  const { eventWatches, recordingUrl } = useFindOne(IEvent, {
    fields: ['eventWatches.id', 'recordingUrl'],
    where: { id: eventId }
  });

  const watchesCount: number = eventWatches?.length;

  return (
    <GrayCard
      label="# of Recording Viewers"
      show={!!recordingUrl}
      value={watchesCount ?? 0}
    />
  );
};

const IndividualEventInsights: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { role } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  return (
    <Section className="s-events-individual-insights" show={!!role}>
      <SidebarHamburgerButton />

      <Row spacing="sm">
        <IndividualEventInsightsAttendeesCard />
        <IndividualEventInsightsGuestsCard />
        <IndividualEventInsightsWatchesCard />
      </Row>

      <Separator marginBottom={0} marginTop={24} />
    </Section>
  );
};

export default IndividualEventInsights;
