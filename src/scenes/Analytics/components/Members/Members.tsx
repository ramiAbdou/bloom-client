import React from 'react';

import AnalyticsActiveSimpleCard from './ActiveSimpleCard';
import Playground from './Playground/Playground';
import AnalyticsTotalSimpleCard from './TotalSimpleCard';
import TotalTimeSeries from './TotalTimeSeries';

const AnalyticsSimpleList = () => (
  <div>
    <AnalyticsTotalSimpleCard />
    <AnalyticsActiveSimpleCard />
  </div>
);

const AnalyticsTimeSeriesList = () => (
  <div>
    <TotalTimeSeries />
    <TotalTimeSeries />
  </div>
);

export default () => (
  <div className="s-analytics-members">
    <AnalyticsSimpleList />
    <AnalyticsTimeSeriesList />
    <Playground />
  </div>
);
