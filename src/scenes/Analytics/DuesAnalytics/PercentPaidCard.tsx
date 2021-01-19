import React from 'react';

import useQuery from '@hooks/useQuery';
import { GET_ACTIVE_DUES_GROWTH } from '../Analytics.gql';
import AnalyticsSimple from '../AnalyticsStatusCard';

const DuesAnalyticsPercentPaidCard: React.FC = () => {
  const { data, loading } = useQuery<number>({
    name: 'getActiveDuesGrowth',
    query: GET_ACTIVE_DUES_GROWTH
  });

  if (loading) return null;

  return <AnalyticsSimple label="Percent of Members Paid" value={`${data}%`} />;
};

export default DuesAnalyticsPercentPaidCard;
