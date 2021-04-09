import React from 'react';

import Show from '@containers/Show';
import { IMember } from '@db/db.entities';
import { QueryResult } from '@gql/GQL.types';
import useFindFull from '@gql/hooks/useFindFull';
import { useStoreState } from '@store/Store';
import MembersAnalyticsCharts from './MembersAnalyticsCharts';
import MembersAnalyticsInsights from './MembersAnalyticsInsights';
import MembersAnalyticsPlayground from './MembersAnalyticsPlayground';

const MembersAnalytics: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { loading }: Partial<QueryResult> = useFindFull(IMember, {
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
