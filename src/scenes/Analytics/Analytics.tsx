import React from 'react';

import LoadingStore from '@store/Loading.store';
import AnalyticsBody from './AnalyticsBody';
import AnalyticsHeader from './AnalyticsHeader';

const Analytics: React.FC = () => (
  <LoadingStore.Provider>
    <AnalyticsHeader />
    <AnalyticsBody />
  </LoadingStore.Provider>
);

export default Analytics;
