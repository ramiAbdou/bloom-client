import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import {
  GET_ACTIVE_MEMBER_ANALYTICS,
  GET_TOTAL_MEMBER_ANALYTICS,
  GetActiveMemberAnalyticsResult,
  GetTotalMemberAnalyticsResult
} from '@scenes/Analytics/Analytics.gql';
import Members from './MembersAnalytics.store';

const useFetchMembersTotalAnalytics = () => {
  const initTotal = Members.useStoreActions((store) => store.initTotal);

  const { data: totalData } = useQuery<GetTotalMemberAnalyticsResult>({
    name: 'getTotalMemberAnalytics',
    query: GET_TOTAL_MEMBER_ANALYTICS
  });

  useEffect(() => {
    if (totalData) initTotal(totalData);
  }, [totalData]);
};

const useFetchMembersActiveAnalytics = () => {
  const initActive = Members.useStoreActions((store) => store.initActive);

  const { data: activeData } = useQuery<GetActiveMemberAnalyticsResult>({
    name: 'getActiveMemberAnalytics',
    query: GET_ACTIVE_MEMBER_ANALYTICS
  });

  useEffect(() => {
    if (activeData) initActive(activeData);
  }, [activeData]);
};

const useFetchMembersAnalytics = () => {
  useFetchMembersTotalAnalytics();
  useFetchMembersActiveAnalytics();
};

export default useFetchMembersAnalytics;
