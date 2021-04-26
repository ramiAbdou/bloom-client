import React, { useEffect } from 'react';

import { BaseProps } from '@util/constants';
import { cx } from '@util/util';
import BarChart from './BarChart';
import { ChartProvider, useChartDispatch } from './Chart.state';
import { ChartDispatch, ChartInitialState, ChartType } from './Chart.types';
import ChartHeader from './ChartHeader';
import PieChart from './PieChart';
import TimeSeriesChart from './TimeSeriesChart';

const ChartContent: React.FC<ChartInitialState> = ({ data, title, type }) => {
  const chartDispatch: ChartDispatch = useChartDispatch();

  useEffect(() => {
    chartDispatch({ data, type: 'SET_DATA' });
  }, [data]);

  useEffect(() => {
    chartDispatch({ chartType: type, type: 'SET_TYPE' });
  }, [type]);

  useEffect(() => {
    chartDispatch({ title, type: 'SET_TITLE' });
  }, [title]);

  return (
    <>
      {type === ChartType.BAR && <BarChart />}
      {type === ChartType.PIE && <PieChart />}
      {type === ChartType.TIME_SERIES && <TimeSeriesChart />}
    </>
  );
};

const Chart: React.FC<ChartInitialState & BaseProps> = ({
  className,
  ...args
}) => {
  const css: string = cx('o-chart', {}, className);

  return (
    <ChartProvider {...args}>
      <div className={css}>
        <ChartHeader />
        <ChartContent {...args} />
      </div>
    </ChartProvider>
  );
};

export default Chart;
