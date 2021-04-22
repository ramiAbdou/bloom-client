import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Show from '@components/containers/Show';
import { IMember } from '@core/db/db.entities';
import { QueryResult } from '@gql/GQL.types';
import useFind from '@gql/hooks/useFind';
import MembersAnalyticsCharts from './MembersAnalyticsCharts';
import MembersAnalyticsInsights from './MembersAnalyticsInsights';
import MembersAnalyticsPlayground from './MembersAnalyticsPlayground';

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
