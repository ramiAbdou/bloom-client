import React, { FC } from 'react';

import HeaderTag from '@components/Element/HeaderTag';
import Chart from './Chart.store';

const ChartTitle = ({ title: titleProp }: Pick<ChartProps, 'title'>) => {
  const numResponses = Chart.useStoreState((store) => store.numResponses);

  const title =
    Chart.useStoreState((store) => store.question?.title) ?? titleProp;

  return (
    <div>
      <h4>{title}</h4>
      {!!numResponses && <HeaderTag value={`${numResponses} Responses`} />}
    </div>
  );
};

type ChartProps = { Content: FC; title?: string };

export default ({ Content, title }: ChartProps) => (
  <div className="s-analytics-chart s-analytics-card">
    <ChartTitle title={title} />
    {Content && <Content />}
  </div>
);
