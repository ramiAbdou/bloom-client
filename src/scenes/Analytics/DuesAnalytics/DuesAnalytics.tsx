import React from 'react';

import MainSection from '@containers/Main/MainSection';
import DuesAnalyticsChart from './DuesAnalyticsChart';
import DuesAnalyticsHistory from './DuesAnalyticsHistory';
import DuesAnalyticsPercentPaidCard from './PercentPaidCard';
import DuesAnalyticsTotalCollectedCard from './TotalCollectedCard';

const DuesAnalytics: React.FC = () => (
  <div className="s-analytics-page s-analytics-dues">
    <MainSection className="flex-ac t-row--spacing-sm">
      <DuesAnalyticsTotalCollectedCard />
      <DuesAnalyticsPercentPaidCard />
    </MainSection>

    <DuesAnalyticsChart />
    <DuesAnalyticsHistory />
  </div>
);

export default DuesAnalytics;
