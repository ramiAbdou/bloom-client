import React, { useEffect } from 'react';

import { cx } from '@util/util';
import BarChart from './BarChart';
import ChartStore, { chartModel } from './Chart.store';
import { ChartModelInitArgs, ChartType } from './Chart.types';
import ChartHeader from './ChartHeader';
import FormatQuestionData from './FormatQuestionData';
import PieChart from './PieChart';
import TimeSeriesChart from './TimeSeriesChart';

const ChartContent = (data: ChartModelInitArgs) => {
  const chartType = ChartStore.useStoreState((state) => {
    return state.type;
  });

  const setData = ChartStore.useStoreActions((state) => {
    return state.setData;
  });

  useEffect(() => {
    // Only time we'll need to update the data is if the title/type are set.
    if (data) setData(data);
  }, [data]);

  return (
    <>
      {chartType === ChartType.BAR && <BarChart />}
      {chartType === ChartType.PIE && <PieChart />}
      {chartType === ChartType.TIME_SERIES && <TimeSeriesChart />}
    </>
  );
};

const Chart: React.FC<ChartModelInitArgs> = ({
  className,
  options,
  questionId,
  show,
  ...args
}) => {
  if (show === false) return null;

  const css: string = cx('o-chart', {}, className);

  return (
    <ChartStore.Provider runtimeModel={{ ...chartModel, options }}>
      {questionId && <FormatQuestionData questionId={questionId} />}

      <div className={css}>
        <ChartHeader />
        <ChartContent {...args} />
      </div>
    </ChartStore.Provider>
  );
};

export default Chart;
