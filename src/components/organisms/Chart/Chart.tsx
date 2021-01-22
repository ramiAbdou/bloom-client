import React, { useEffect } from 'react';

import BarChart from './Bar';
import ChartStore, { chartModel } from './Chart.store';
import { ChartModelInitArgs, ChartType } from './Chart.types';
import FormatQuestionData from './FormatQuestionData';
import ChartHeader from './Header';
import PieChart from './Pie';
import TimeSeriesChart from './TimeSeries';

const ChartContent = ({ questionId, ...data }: ChartModelInitArgs) => {
  const chartType = ChartStore.useStoreState((store) => store.type);
  const setData = ChartStore.useStoreActions((store) => store.setData);

  useEffect(() => {
    // Only time we'll need to update the data is if the title/type are set.
    if (data) setData(data);
  }, [data]);

  return (
    <>
      {questionId && <FormatQuestionData questionId={questionId} />}
      {chartType === ChartType.BAR && <BarChart />}
      {chartType === ChartType.PIE && <PieChart />}
      {chartType === ChartType.TIME_SERIES && <TimeSeriesChart />}
    </>
  );
};

const Chart: React.FC<ChartModelInitArgs> = ({ options, show, ...args }) => {
  if (show === false) return null;

  return (
    <ChartStore.Provider runtimeModel={{ ...chartModel, options }}>
      <div className="c-chart">
        <ChartHeader />
        <ChartContent {...args} />
      </div>
    </ChartStore.Provider>
  );
};

export default Chart;
