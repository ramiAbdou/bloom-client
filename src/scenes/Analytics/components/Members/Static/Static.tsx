import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import { GET_MEMBER_ANALYTICS } from '../../../Analytics.gql';
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
  const init = Members.useStoreActions((store) => store.init);
  const { data } = useQuery(GET_MEMBER_ANALYTICS);

  useEffect(() => {
    const result = data?.getMemberAnalytics ?? {};
    if (!result) return;
    init(result);
  }, [data]);

  return null;
};

export default () => (
  <Members.Provider>
    <FetchMemberAnalytics />
    <AnalyticsSimpleList />
    <AnalyticsTimeSeriesList />
  </Members.Provider>
);
