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

  // If not admin or no RSVP's have been collected, don't show!
  if (!isAdmin || data?.every(({ value }) => !value)) return null;

  return (
    <div className="s-events-individual-analytics">
      <Separator marginBottom={36} marginTop={0} />

      <MainSection loading={loading} title="Event Analytics">
        <Chart
          data={data}
          interval={2}
          options={{
            format: 'HOUR',
            yAxis: { domain: [0, (dataMax: number) => dataMax + 5] }
          }}
          show={!loading}
          title="RSVP's Collected"
          type={ChartType.TIME_SERIES}
        />
      </MainSection>
    </div>
  );
};

export default IndividualEventAnalytics;
