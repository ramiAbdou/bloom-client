import React from 'react';

import HeaderTag from '@components/atoms/Tag/HeaderTag';
import { getChartTotalCount, useChartState } from './Chart.state';
import { ChartState } from './Chart.types';

const ChartHeaderTitle: React.FC = () => {
  const { title }: ChartState = useChartState();
  return <h4>{title}</h4>;
};

const ChartHeaderResponsesCount: React.FC = () => {
  const chartState: ChartState = useChartState();
  const totalCount: number = getChartTotalCount(chartState);
  return <HeaderTag>{totalCount} Responses</HeaderTag>;
};

const ChartHeader: React.FC = () => (
  <div>
    <ChartHeaderTitle />
    <ChartHeaderResponsesCount />
  </div>
);

export default ChartHeader;
