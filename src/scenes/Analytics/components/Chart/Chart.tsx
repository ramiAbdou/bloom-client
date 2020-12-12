import React, { useEffect } from 'react';

import Chart, { ChartModel } from './Chart.store';

const ChartTitle = () => {
  const title = Chart.useStoreState((store) => store.title);
  return <h4>{title}</h4>;
};

const ChartContent = (model: Pick<ChartModel, 'data' | 'title'>) => {
  const setData = Chart.useStoreActions((store) => store.setData);
  const setTitle = Chart.useStoreActions((store) => store.setTitle);

  useEffect(() => {
    const { title } = model ?? {};
    if (title) setTitle(title);
  }, [model?.title]);

  useEffect(() => {
    const { data } = model ?? {};
    if (data) setData(data);
  }, [model?.data]);

  return (
    <div className="s-analytics-chart">
      <ChartTitle />
    </div>
  );
};

export default (model: Pick<ChartModel, 'data' | 'title'>) => (
  <Chart.Provider>
    <ChartContent {...model} />
  </Chart.Provider>
);
