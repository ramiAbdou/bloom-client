import day from 'dayjs';
import React from 'react';

import Separator from '@atoms/Separator';
import AnalyticsCard from '@containers/Card/AnalyticsCard';
import Grid from '@containers/Grid/Grid';
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
      value={numAttendees}
    />
  );
};

const IndividualEventInsightsGuestsCard: React.FC = () => {
  const numGuests = useStoreState(({ db }) => db.event.guests?.length);
  return <AnalyticsCard label="# of RSVPs" value={numGuests} />;
};

const IndividualEventInsightsWatchesCard: React.FC = () => {
  const recordingUrl = useStoreState(({ db }) => db.event.recordingUrl);
  const numWatches = useStoreState(({ db }) => db.event.watches?.length);

  return (
    <AnalyticsCard
      label="# of Recording Viewers"
      show={!!recordingUrl}
      value={numWatches}
    />
  );
};

const IndividualEventInsights: React.FC = () => {
  const isAdmin = useStoreState(({ db }) => !!db.member?.role);

  return (
    <MainSection className="s-events-individual-insights" show={!!isAdmin}>
      <Grid spacing="sm">
        <IndividualEventInsightsAttendeesCard />
        <IndividualEventInsightsGuestsCard />
        <IndividualEventInsightsWatchesCard />
      </Grid>

      <Separator marginBottom={0} marginTop={24} />
    </MainSection>
  );
};

export default IndividualEventInsights;
