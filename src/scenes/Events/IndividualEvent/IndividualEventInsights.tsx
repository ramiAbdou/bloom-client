import day from 'dayjs';
import React from 'react';

import Separator from '@atoms/Separator';
import AnalyticsCard from '@containers/Card/AnalyticsCard';
import MainSection from '@containers/Main/MainSection';
import Row from '@containers/Row/Row';
import { useStoreState } from '@store/Store';

const IndividualEventInsightsAttendeesCard: React.FC = () => {
  const startTime = useStoreState(({ db }) => db.event.startTime);
  const numAttendees = useStoreState(({ db }) => db.event.attendees?.length);

  return (
    <AnalyticsCard
      label="# of Attendees"
      show={!!day().isAfter(day(startTime))}
      value={numAttendees ?? 0}
    />
  );
};

const IndividualEventInsightsGuestsCard: React.FC = () => {
  const numGuests = useStoreState(({ db }) => db.event.guests?.length);
  // useStoreState(({ db }) => console.log(db.event));
  return <AnalyticsCard label="# of RSVPs" value={numGuests ?? 0} />;
};

const IndividualEventInsightsWatchesCard: React.FC = () => {
  const recordingUrl = useStoreState(({ db }) => db.event.recordingUrl);
  const numWatches = useStoreState(({ db }) => db.event.watches?.length);

  return (
    <AnalyticsCard
      label="# of Recording Viewers"
      show={!!recordingUrl}
      value={numWatches ?? 0}
    />
  );
};

const IndividualEventInsights: React.FC = () => {
  const isAdmin = useStoreState(({ db }) => !!db.member?.role);

  return (
    <MainSection className="s-events-individual-insights" show={!!isAdmin}>
      <Row spacing="sm">
        <IndividualEventInsightsAttendeesCard />
        <IndividualEventInsightsGuestsCard />
        <IndividualEventInsightsWatchesCard />
      </Row>

      <Separator marginBottom={0} marginTop={24} />
    </MainSection>
  );
};

export default IndividualEventInsights;
