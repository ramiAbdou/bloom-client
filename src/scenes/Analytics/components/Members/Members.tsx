import React from 'react';

import Playground from './Playground/Playground';
import AnalyticsSimpleActive from './SimpleActive';
import AnalyticsSimpleTotal from './SimpleTotal';
import TimeSeries from './TimeSeries';

const AnalyticsSimpleList = () => (
  <div>
    <AnalyticsSimpleTotal />
    <AnalyticsSimpleActive />
  </div>
);

const AnalyticsTimeSeriesList = () => (
  <div>
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
