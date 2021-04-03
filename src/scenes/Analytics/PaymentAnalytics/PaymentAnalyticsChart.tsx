import React from 'react';

import Section from '@containers/Section';
import useBloomQuery from '@hooks/useBloomQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { QueryEvent } from '@util/constants.events';
import { TimeSeriesData } from '../Analytics.types';

const PaymentAnalyticsChart: React.FC = () => {
  const { data, loading } = useBloomQuery<TimeSeriesData[]>({
    fields: ['name', 'value'],
    operation: QueryEvent.GET_PAYMENTS_SERIES
  });

  return (
    <Section show={!loading && data?.some(({ value }) => !!value)}>
      <Chart
        data={data}
        interval={2}
        options={{ format: 'MONEY' }}
        title="Total Dues Collected"
        type={ChartType.TIME_SERIES}
      />
    </Section>
  );
};

export default PaymentAnalyticsChart;
