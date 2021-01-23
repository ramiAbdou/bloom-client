import React from 'react';

import Separator from '@atoms/Separator';
import MainSection from '@containers/Main/MainSection';
import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { useStoreState } from '@store/Store';
import { TimeSeriesResult } from '../../Analytics/Analytics.types';
import { GET_EVENT_GUEST_SERIES, GetEventArgs } from '../Events.gql';

const IndividualEventAnalytics: React.FC = () => {
  const eventId = useStoreState(({ db }) => db.event?.id);
  const isAdmin = useStoreState(({ db }) => !!db.member.role);

  const { data, loading } = useQuery<TimeSeriesResult[], GetEventArgs>({
    name: 'getEventGuestSeries',
    query: GET_EVENT_GUEST_SERIES,
    variables: { eventId }
  });

  console.log(data);

  if (!isAdmin) return null;

  return (
    <div className="s-events-individual-analytics">
      <Separator marginBottom={36} marginTop={0} />

      <MainSection loading={loading} title="Event Analytics">
        <Chart
          data={data}
          interval={2}
          options={{ format: 'HOUR' }}
          show={!loading}
          title="RSVP's Collected"
          type={ChartType.TIME_SERIES}
        />
      </MainSection>
    </div>
  );
};

export default IndividualEventAnalytics;
