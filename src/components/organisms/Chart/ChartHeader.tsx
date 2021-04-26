import React from 'react';

import HeaderTag from '@components/atoms/Tag/HeaderTag';
import { useChartState } from './Chart.state';
import { ChartState } from './Chart.types';

const ChartHeaderTitle: React.FC = () => {
  const { title }: ChartState = useChartState();
  return <h4>{title}</h4>;
};

const ChartHeaderResponsesCount: React.FC = () => {
  const { data }: ChartState = useChartState();
  return <HeaderTag>{data?.length ?? 0} Responses</HeaderTag>;
};

const ChartHeader: React.FC = () => (
  <div>
    <ChartHeaderTitle />
    <ChartHeaderResponsesCount />
  </div>
);

export default ChartHeader;
