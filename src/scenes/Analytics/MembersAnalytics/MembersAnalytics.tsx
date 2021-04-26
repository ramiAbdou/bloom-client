import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { DocumentNode, gql, useReactiveVar } from '@apollo/client';
import { QueryResult } from '@gql/GQL.types';
import useFind from '@gql/hooks/useFind';
import { IMember } from '@util/constants.entities';
// import MembersAnalyticsCharts from './MembersAnalyticsCharts';
import MembersAnalyticsOverviewSection from './MembersAnalyticsOverviewSection';
import MembersAnalyticsPlaygroundSection from './MembersAnalyticsPlaygroundSection';

const GET_MEMBERS_ANALYTICS: DocumentNode = gql`
  query GetMembersAnalytics($communityId: String!) {
    members(where: { communityId: { _eq: $communityId } }) {
      id
    }
  }
`;

const MembersAnalytics: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { loading }: Partial<QueryResult> = useFind(IMember, {
    fields: [
      'id',
      'community.id',
      'memberType.id',
      'memberValues.id',
      'memberValues.member.id',
      'memberValues.question.id',
      'memberValues.value',
      'status'
    ],
    where: { communityId }
  });

  if (loading) return null;

  return (
    <>
      <div className="s-analytics-page s-analytics-members">
        <MembersAnalyticsOverviewSection />
        {/* <MembersAnalyticsCharts />
        <MembersAnalyticsPlayground /> */}
        <MembersAnalyticsPlaygroundSection />
      </div>
    </>
  );
};

export default MembersAnalytics;
