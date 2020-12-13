import { useQuery } from 'graphql-hooks';
import React from 'react';

import Chart from '@components/Chart/Chart';
import { ChartType } from '@components/Chart/Chart.store';
import { GET_TIME_SERIES } from '../../Analytics.gql';

export default () => {
  const { data, loading } = useQuery(GET_TIME_SERIES);
  if (loading) return null;

  return (
    <Chart
      data={data?.getTimeSeries}
      title="Total Members"
      type={ChartType.TIME_SERIES}
    />
  );
};
