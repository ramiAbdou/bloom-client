import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import AnalyticsHeader from '../AnalyticsHeader';
import MembersAnalyticsChartSection from './MembersAnalyticsChartSection';
import MembersAnalyticsOverviewSection from './MembersAnalyticsOverviewSection';
import MembersAnalyticsPlaygroundSection from './MembersAnalyticsPlaygroundSection';

const GET_MEMBERS_ANALYTICS: DocumentNode = gql`
  query GetMembersAnalytics($communityId: String!) {
    communityId @client @export(as: "communityId")

    members(where: { communityId: { _eq: $communityId } }) {
      id
    }
  }
`;

const MembersAnalytics: React.FC = () => {
  const { loading } = useQuery(GET_MEMBERS_ANALYTICS);

  return (
    <>
      <AnalyticsHeader loading={loading} />

      <div className="s-analytics-page s-analytics-members">
        <MembersAnalyticsOverviewSection />
        <MembersAnalyticsChartSection />
        <MembersAnalyticsPlaygroundSection />
      </div>
    </>
  );
};

export default MembersAnalytics;
