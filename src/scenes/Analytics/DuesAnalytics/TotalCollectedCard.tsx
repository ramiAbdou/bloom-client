import React from 'react';

import AnalyticsCard from '@containers/Card/AnalyticsCard';
import useQuery from '@hooks/useQuery';
import { GET_TOTAL_DUES_GROWTH } from '../Analytics.gql';

const DuesAnalyticsTotalCollectedCard: React.FC = () => {
  const { data, loading } = useQuery<number>({
    name: 'getTotalDuesGrowth',
    query: GET_TOTAL_DUES_GROWTH
  });

  if (loading) return null;
  return <AnalyticsCard label="Total Dues Collected" value={`$${data}`} />;
};

export default DuesAnalyticsTotalCollectedCard;
