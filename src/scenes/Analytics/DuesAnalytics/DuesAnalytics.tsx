import React from 'react';

import Row from '@containers/Row/Row';
import DuesAnalyticsChart from './DuesAnalyticsChart';
import DuesAnalyticsHistory from './DuesAnalyticsHistory';
import DuesAnalyticsPercentPaidCard from './PercentPaidCard';
import DuesAnalyticsTotalCollectedCard from './TotalCollectedCard';

const DuesAnalytics: React.FC = () => (
  <div className="s-analytics-page s-analytics-dues">
    <Row spacing="sm">
      <DuesAnalyticsTotalCollectedCard />
      <DuesAnalyticsPercentPaidCard />
    </Row>

    <DuesAnalyticsChart />
    <DuesAnalyticsHistory />
  </div>
);

export default DuesAnalytics;
