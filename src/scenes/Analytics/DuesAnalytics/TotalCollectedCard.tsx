import React from 'react';

import useQuery from '@hooks/useQuery';
import {
  GET_TOTAL_DUES_COLLECTED,
  GetTotalDuesCollectedResult
} from '../Analytics.gql';
import AnalyticsSimple from '../AnalyticsStatusCard';

const DuesAnalyticsTotalCollectedCard: React.FC = () => {
  // const initTotal = Members.useStoreActions((store) => store.initTotal);

  const { data, loading } = useQuery<GetTotalDuesCollectedResult>({
    name: 'getTotalDuesCollected',
    query: GET_TOTAL_DUES_COLLECTED
  });

  if (loading) return null;

  return (
    <AnalyticsSimple
      label="Total Dues Collected"
      percentage={data?.percentage}
      value={`$${data?.amount?.toLocaleString()}`}
    />
  );
};

export default DuesAnalyticsTotalCollectedCard;
