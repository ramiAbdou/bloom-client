import React from 'react';

import MainSection from '@containers/Main/MainSection';
import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { QueryEvent } from '@util/constants.events';
import { TimeSeriesData } from '../Analytics.types';

const PaymentAnalyticsChart: React.FC = () => {
  const { data, loading } = useQuery<TimeSeriesData[]>({
    fields: ['name', 'value'],
    operation: QueryEvent.GET_PAYMENTS_SERIES
  });

  return (
    <MainSection
      show={
        !loading &&
        data?.some(({ value }) => {
          return !!value;
        })
      }
    >
      <Chart
        data={data}
        interval={2}
        options={{ format: 'MONEY' }}
        title="Total Dues Collected"
        type={ChartType.TIME_SERIES}
      />
    </MainSection>
  );
};

export default PaymentAnalyticsChart;
