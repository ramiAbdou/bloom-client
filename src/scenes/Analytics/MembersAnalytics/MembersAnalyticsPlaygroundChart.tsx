import React from 'react';

import { gql } from '@apollo/client';
import Chart from '@components/organisms/Chart/Chart';
import { ChartData, ChartType } from '@components/organisms/Chart/Chart.types';
import { ComponentWithFragments, QuestionType } from '@util/constants';
import { IMemberValue, IQuestion } from '@util/constants.entities';

const MembersAnalyticsPlaygroundChart: ComponentWithFragments<IQuestion> = ({
  data: question
}) => {
  const chartType: ChartType =
    question.type === QuestionType.MULTIPLE_CHOICE ||
    question.type === QuestionType.MULTIPLE_SELECT
      ? ChartType.PIE
      : ChartType.BAR;

  const chartRecord: Record<string, number> = question.memberValues.reduce(
    (acc: Record<string, number>, { value }: IMemberValue) => {
      return { ...acc, [value]: acc[value] ? acc[value] + 1 : 1 };
    },
    {}
  );

  const chartData: ChartData[] = Object.entries(chartRecord)
    .sort(([_, aValue], [__, bValue]) => {
      if (aValue < bValue) return 1;
      if (aValue > bValue) return -1;
      return 0;
    })
    ?.map((data) => {
      return { name: data[0], value: data[1] };
    });

  console.log(chartData);

  return <Chart data={chartData} title={question.title} type={chartType} />;
};

MembersAnalyticsPlaygroundChart.fragment = gql`
  fragment MembersAnalyticsPlaygroundChartFragment on questions {
    category
    id
    title
    type

    memberValues {
      id
      value
    }
  }
`;

export default MembersAnalyticsPlaygroundChart;
