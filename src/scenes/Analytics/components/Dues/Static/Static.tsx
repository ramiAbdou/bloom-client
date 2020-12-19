import React from 'react';

import PercentCollectedCard from './PercentCollectedCard';
import TotalCollectedCard from './TotalCollectedCard';
import TotalCollectedChart from './TotalCollectedChart';

// We use the term "Static" here to mean that the data is not dynamic like
// how the "Playground", where you could choose different questions, etc.

const DuesAnalyticsSimpleList = () => (
  <div>
    <TotalCollectedCard />
    <PercentCollectedCard />
  </div>
);

export default () => (
  <>
    <DuesAnalyticsSimpleList />
    <TotalCollectedChart />
  </>
);
