import React from 'react';

import HeaderTag from '@components/atoms/Tag/HeaderTag';
import { useChart, useChartTotalCount } from './Chart.state';

const ChartHeaderTitle: React.FC = () => {
  const [{ title }] = useChart();
  return <h4>{title}</h4>;
};

const ChartHeaderResponsesCount: React.FC = () => {
  const totalCount: number = useChartTotalCount();
  return <HeaderTag>{totalCount} Responses</HeaderTag>;
};

const ChartHeader: React.FC = () => (
  <div>
    <ChartHeaderTitle />
    <ChartHeaderResponsesCount />
  </div>
);

export default ChartHeader;
