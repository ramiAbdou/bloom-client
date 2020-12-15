import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import {
  GET_ACTIVE_MEMBER_ANALYTICS,
  GET_TOTAL_MEMBER_ANALYTICS
} from '../../../Analytics.gql';
import Members from '../Members.store';
import ActiveMembersCard from './ActiveMembersCard';
import ActiveMembersChart from './ActiveMembersChart';
import TotalMembersCard from './TotalMembersCard';
import TotalMembersChart from './TotalMembersChart';

// We use the term "Static" here to mean that the data is not dynamic like
// how the "Playground", where you could choose different questions, etc.

const AnalyticsSimpleList = () => (
  <div>
    <TotalMembersCard />
    <ActiveMembersCard />
  </div>
);

const AnalyticsTimeSeriesList = () => (
  <div>
    <TotalMembersChart />
    <ActiveMembersChart />
  </div>
);

const FetchMemberAnalytics = () => {
  const initActive = Members.useStoreActions((store) => store.initActive);
  const initTotal = Members.useStoreActions((store) => store.initTotal);

  const { data: activeData } = useQuery(GET_ACTIVE_MEMBER_ANALYTICS);
  const { data: totalData } = useQuery(GET_TOTAL_MEMBER_ANALYTICS);

  useEffect(() => {
    const result = activeData?.getActiveMemberAnalytics ?? {};
    if (!result) return;
    initActive(result);
  }, [activeData]);

  useEffect(() => {
    const result = totalData?.getTotalMemberAnalytics ?? {};
    if (!result) return;
    initTotal(result);
  }, [totalData]);

  return null;
};

export default () => (
  <Members.Provider>
    <FetchMemberAnalytics />
    <AnalyticsSimpleList />
    <AnalyticsTimeSeriesList />
  </Members.Provider>
);
