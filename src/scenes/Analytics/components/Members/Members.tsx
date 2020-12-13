import React from 'react';

import AnalyticsActiveSimpleCard from './ActiveSimpleCard';
import Playground from './Playground/Playground';
import TimeSeries from './TimeSeries';
import AnalyticsTotalSimpleCard from './TotalSimpleCard';

const AnalyticsSimpleList = () => (
  <div>
    <AnalyticsTotalSimpleCard />
    <AnalyticsActiveSimpleCard />
  </div>
);

const AnalyticsTimeSeriesList = () => (
  <div>
    <TimeSeries />
    <TimeSeries />
  </div>
);

export default () => (
  <div className="s-analytics-members">
    <AnalyticsSimpleList />
    <AnalyticsTimeSeriesList />
    <Playground />
  </div>
);
