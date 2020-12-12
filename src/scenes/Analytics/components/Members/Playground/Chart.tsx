import deepequal from 'fast-deep-equal';
import React from 'react';

import { QuestionType } from '@constants';
import { useStoreState } from '@store/Store';
import Chart from '../../Chart/Chart';
import { ChartData } from '../../Chart/Chart.store';
import Playground from './Playground.store';

const useShortTextData = (questionId: string): [ChartData[], number] => {
  const type: QuestionType = useStoreState(
    ({ db }) => db.entities.questions.byId[questionId]?.type
  );

  const result: [ChartData[], number] = useStoreState(({ db }) => {
    const record: Record<string, number> = {};
    const { byId: byMemberId } = db.entities.members;
    const { members } = db.community;

    if (!members?.length || !questionId) return [[], 0];

    let numMembers = 0;

    members.forEach((memberId: string) => {
      const { value } =
        byMemberId[memberId].allData?.find(
          (data) => data.questionId === questionId
        ) ?? {};

      if (!value) return;

      if (type === 'MULTIPLE_SELECT') {
        value.split(',').forEach((element: string) => {
          if (!element) return;
          if (record[element]) record[element]++;
          else record[element] = 1;
        });
      } else if (record[value]) record[value]++;
      else record[value] = 1;

      numMembers++;
    });

    return [
      Object.entries(record)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => (a.value < b.value ? 1 : -1)),
      numMembers
    ];
  }, deepequal);

  return result;
};

export default () => {
  const questionId = Playground.useStoreState((store) => store.questionId);

  const [data, numResponses]: [ChartData[], number] = useShortTextData(
    questionId
  );

  const question = useStoreState(
    ({ db }) => db.entities.questions.byId[questionId],
    deepequal
  );

  if (!question || !data.length) return null;

  return <Chart data={data} numResponses={numResponses} question={question} />;
};
