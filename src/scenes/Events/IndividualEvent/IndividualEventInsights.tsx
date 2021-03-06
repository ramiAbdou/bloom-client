import React from 'react';

import Separator from '@atoms/Separator';
import GrayCard from '@containers/Card/GrayCard';
import Row from '@containers/Row/Row';
import Section from '@containers/Section';
import SidebarHamburgerButton from '@organisms/Sidebar/SidebarHamburgerButton';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { useStoreState } from '@store/Store';

const IndividualEventInsightsAttendeesCard: React.FC = () => {
  const endTime: string = useStoreState(({ db }) => db.event.startTime);
  const startTime: string = useStoreState(({ db }) => db.event.startTime);

  const numAttendees: number = useStoreState(
    ({ db }) => db.event.attendees?.length
  );

  const isUpcoming: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.UPCOMING;

  return (
    <GrayCard
      label="# of Attendees"
      show={!isUpcoming}
      value={numAttendees ?? 0}
    />
  );
};

const IndividualEventInsightsGuestsCard: React.FC = () => {
  const numGuests = useStoreState(({ db }) => db.event.guests?.length);

  return <GrayCard label="# of RSVPs" value={numGuests ?? 0} />;
};

const IndividualEventInsightsWatchesCard: React.FC = () => {
  const recordingUrl = useStoreState(({ db }) => db.event.recordingUrl);
  const numWatches = useStoreState(({ db }) => db.event.watches?.length);

  return (
    <GrayCard
      label="# of Recording Viewers"
      show={!!recordingUrl}
      value={numWatches ?? 0}
    />
  );
};

const IndividualEventInsights: React.FC = () => {
  const isAdmin = useStoreState(({ db }) => !!db.member?.role);

  return (
    <Section className="s-events-individual-insights" show={!!isAdmin}>
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
