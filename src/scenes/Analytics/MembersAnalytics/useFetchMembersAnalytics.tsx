import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import {
  GET_ACTIVE_MEMBER_ANALYTICS,
  GET_TOTAL_MEMBER_ANALYTICS,
  GetActiveMemberAnalyticsResult,
  GetTotalMemberAnalyticsResult
} from '@scenes/Analytics/Analytics.gql';
import Members from './MembersAnalytics.store';

export const useFetchMembersTotalAnalytics = (): boolean => {
  const initTotal = Members.useStoreActions((store) => store.initTotal);

  const { data: totalData, loading } = useQuery<GetTotalMemberAnalyticsResult>({
    name: 'getTotalMemberAnalytics',
    query: GET_TOTAL_MEMBER_ANALYTICS
  });

  useEffect(() => {
    if (totalData) initTotal(totalData);
  }, [totalData]);

  return loading;
};

export const useFetchMembersActiveAnalytics = () => {
  const initActive = Members.useStoreActions((store) => store.initActive);

  const { data: activeData, loading } = useQuery<
    GetActiveMemberAnalyticsResult
  >({
    name: 'getActiveMemberAnalytics',
    query: GET_ACTIVE_MEMBER_ANALYTICS
  });

  useEffect(() => {
    if (activeData) initActive(activeData);
  }, [activeData]);

  return loading;
};
