import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import { GET_TIME_SERIES } from '../../Analytics.gql';
import ChartContent from '../Chart/Chart';
import Chart from '../Chart/Chart.store';
import LineChart from '../Chart/Line';

const TimeSeriesContent = () => {
  const initData = Chart.useStoreActions((store) => store.initData);
  const { data, loading } = useQuery(GET_TIME_SERIES);

  useEffect(() => {
    const result = data?.getTimeSeries;
    if (result) initData({ data: result });
  }, [data]);

  if (loading) return null;
  return <LineChart />;
};

export default () => (
  <Chart.Provider>
    <ChartContent Content={TimeSeriesContent} title="Total Members" />
  </Chart.Provider>
);
