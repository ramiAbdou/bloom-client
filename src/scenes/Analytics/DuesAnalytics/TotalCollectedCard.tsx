import React from 'react';

import useQuery from '@hooks/useQuery';
import { GET_TOTAL_DUES_GROWTH } from '../Analytics.gql';
import AnalyticsSimple from '../AnalyticsStatusCard';

const DuesAnalyticsTotalCollectedCard: React.FC = () => {
  const { data, loading } = useQuery<number>({
    name: 'getTotalDuesGrowth',
    query: GET_TOTAL_DUES_GROWTH
  });

  if (loading) return null;
  return <AnalyticsSimple label="Total Dues Collected" value={`$${data}`} />;
};

export default DuesAnalyticsTotalCollectedCard;
