import React from 'react';

import Loading from '@store/Loading.store';
import AnalyticsBody from './AnalyticsBody';
import AnalyticsHeader from './AnalyticsHeader';

const Analytics: React.FC = () => (
  <Loading.Provider>
    <AnalyticsHeader />
    <AnalyticsBody />
  </Loading.Provider>
);

export default Analytics;
