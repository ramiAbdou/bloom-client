import React from 'react';

import Show from '@containers/Show';
import { QueryResult } from '@gql/useQuery.types';
import MembersAnalyticsCharts from './MembersAnalyticsCharts';
import MembersAnalyticsInsights from './MembersAnalyticsInsights';
import MembersAnalyticsPlayground from './MembersAnalyticsPlayground';
import useInitMembersAnalytics from './useInitMembersAnalytics';

const MembersAnalytics: React.FC = () => {
  const { loading }: Partial<QueryResult> = useInitMembersAnalytics();

  return (
    <Show show={!loading}>
      <div className="s-analytics-page s-analytics-members">
        <MembersAnalyticsInsights />
        <MembersAnalyticsCharts />
        <MembersAnalyticsPlayground />
      </div>
    </Show>
  );
};

export default MembersAnalytics;
