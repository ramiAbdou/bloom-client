import React from 'react';

import useQuery from '@hooks/useQuery';
import {
  GET_TOTAL_DUES_COLLECTED,
  GetTotalDuesCollectedResult
} from '../Analytics.gql';
import AnalyticsSimple from '../AnalyticsStatusCard';

const DuesAnalyticsTotalCollectedCard: React.FC = () => {
  const value = 9450;

  // const initTotal = Members.useStoreActions((store) => store.initTotal);

  const { data, loading } = useQuery<GetTotalDuesCollectedResult>({
    name: 'getTotalMemberAnalytics',
    query: GET_TOTAL_DUES_COLLECTED
  });

  console.log(data);

  // useEffect(() => {
  //   if (totalData) initTotal(totalData);
  // }, [totalData]);

  // return loading;

  return (
    <AnalyticsSimple
      label="Total Dues Collected"
      percentage={8}
      value={`$${value.toLocaleString()}`}
    />
  );
};

export default DuesAnalyticsTotalCollectedCard;
