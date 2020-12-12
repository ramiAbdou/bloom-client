import deepequal from 'fast-deep-equal';
import React, { useMemo } from 'react';

import { useStoreState } from '@store/Store';
import Chart from '../../Chart/Chart';
import { ChartData } from '../../Chart/Chart.store';
import Playground from './Playground.store';

const useShortTextData = (questionId: string): [ChartData[], number] => {
  const result: Record<string, number> = useStoreState(({ db }) => {
    const record: Record<string, number> = {};
    const { byId: byMemberId } = db.entities.members;
    const { members } = db.community;

    if (!members?.length || !questionId) return record;

    members.forEach((memberId: string) => {
      const { allData } = byMemberId[memberId];

      const { value } =
        allData?.find((data) => data.questionId === questionId) ?? {};

      if (value) {
        if (record[value]) record[value]++;
        else record[value] = 1;
      }
    });

    return record;
  }, deepequal);

  return [
    Object.entries(result)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => (a.value < b.value ? 1 : -1)),
    Object.values(result).reduce((acc: number, curr: number) => acc + curr, 0)
  ];
};

export default () => {
  const questionId = Playground.useStoreState((store) => store.questionId);

  const result = useShortTextData(questionId);

  const [data, numResponses]: [ChartData[], number] = useMemo(() => result, [
    questionId
  ]);

  const question = useStoreState(
    ({ db }) => db.entities.questions.byId[questionId],
    deepequal
  );

  if (!question || !data.length) return null;

  return <Chart data={data} numResponses={numResponses} question={question} />;
};
