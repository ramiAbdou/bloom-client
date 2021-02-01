import day from 'dayjs';
import React from 'react';

import Separator from '@atoms/Separator';
import AnalyticsCard from '@containers/Card/AnalyticsCard';
import Row from '@containers/Row/Row';
import { useStoreState } from '@store/Store';

const IndividualEventInsightsAttendeesCard: React.FC = () => {
  const startTime = useStoreState(({ db }) => db.event.startTime);
  const numAttendees = useStoreState(({ db }) => db.event.attendees?.length);
  if (day().isBefore(day(startTime))) return null;
  return <AnalyticsCard label="# of Attendees" value={numAttendees} />;
};

const IndividualEventInsightsGuestsCard: React.FC = () => {
  const numGuests = useStoreState(({ db }) => db.event.guests?.length);
  return <AnalyticsCard label="# of RSVPs" value={numGuests} />;
};

const IndividualEventInsightsWatchesCard: React.FC = () => {
  const recordingUrl = useStoreState(({ db }) => db.event.recordingUrl);
  const numWatches = useStoreState(({ db }) => db.event.watches?.length);
  if (!recordingUrl) return null;
  return <AnalyticsCard label="# of Recording Viewers" value={numWatches} />;
};

const IndividualEventInsights: React.FC = () => {
  const isAdmin = useStoreState(({ db }) => !!db.member?.role);
  if (!isAdmin) return null;

  return (
    <>
      <Row spacing="sm">
        <IndividualEventInsightsAttendeesCard />
        <IndividualEventInsightsGuestsCard />
        <IndividualEventInsightsWatchesCard />
      </Row>

      <Separator margin={24} />
    </>
  );
};

export default IndividualEventInsights;
