import React from 'react';

import Separator from '@atoms/Separator';
import MainSection from '@containers/Main/MainSection';
import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { GET_TOTAL_DUES_SERIES } from '../../Analytics/Analytics.gql';
import { TimeSeriesResult } from '../../Analytics/Analytics.types';

const IndividualEventAnalytics: React.FC = () => {
  const { data, loading } = useQuery<TimeSeriesResult[]>({
    name: 'getTotalDuesSeries',
    query: GET_TOTAL_DUES_SERIES
  });

  if (loading || data?.every(({ value }) => !value)) return null;

  return (
    <div className="s-events-individual-analytics">
      <Separator marginBottom={36} marginTop={0} />

      <MainSection loading={loading} title="Event Analytics">
        <Chart
          data={data}
          interval={2}
          show={!loading && data?.some(({ value }) => value)}
          title="RSVP's Collected"
          type={ChartType.TIME_SERIES}
        />
      </MainSection>
    </div>
  );
};

export default IndividualEventAnalytics;
