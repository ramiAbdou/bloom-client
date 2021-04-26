import React from 'react';

import { useReactiveVar } from '@apollo/client';
import Chart from '@components/organisms/Chart/Chart';
import { membersAnalyticsPlaygroundQuestionIdVar } from '../Analytics.reactive';

const MembersAnalyticsPlaygroundChart: React.FC = () => {
  const questionId: string = useReactiveVar(
    membersAnalyticsPlaygroundQuestionIdVar
  );

  return <Chart questionId={questionId} />;
};

export default MembersAnalyticsPlaygroundChart;
