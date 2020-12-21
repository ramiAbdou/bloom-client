import React, { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import {
  GET_ACTIVE_MEMBER_ANALYTICS,
  GET_TOTAL_MEMBER_ANALYTICS,
  GetActiveMemberAnalyticsResult,
  GetTotalMemberAnalyticsResult
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

  const { data: activeData } = useQuery<GetActiveMemberAnalyticsResult>({
    name: 'getActiveMemberAnalytics',
    query: GET_ACTIVE_MEMBER_ANALYTICS
  });

  const { data: totalData } = useQuery<GetTotalMemberAnalyticsResult>({
    name: 'getTotalMemberAnalytics',
    query: GET_TOTAL_MEMBER_ANALYTICS
  });

  useEffect(() => {
    if (activeData) initActive(activeData);
  }, [activeData]);

  useEffect(() => {
    if (totalData) initTotal(totalData);
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
