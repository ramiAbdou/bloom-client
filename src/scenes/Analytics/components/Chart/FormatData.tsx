import deepequal from 'fast-deep-equal';
import { useEffect } from 'react';

import { QuestionType } from '@constants';
import { IMember } from '@store/entities';
import { useStoreState } from '@store/Store';
import Chart, { ChartModelInitArgs } from './Chart.store';

const useData = (): ChartModelInitArgs => {
  const questionId = Chart.useStoreState((store) => store.question?.id);

  const type: QuestionType = useStoreState(
    ({ db }) => db.entities.questions.byId[questionId]?.type
  );

  // Construct the data array and calculate the number of responses that
  // were valid for the question (not null).
  const result: ChartModelInitArgs = useStoreState(({ db }) => {
    const record: Record<string, number> = {};
    const { byId: byMemberId } = db.entities.members;
    const { members } = db.community;

    // If the community doesn't have members loaded yet,
    if (!members?.length || !questionId) return { data: [], numResponses: 0 };

    // Initialize a counter for the number of meaningful responses.
    let numResponses = 0;

    members.forEach((memberId: string) => {
      const { value } =
        (byMemberId[memberId] as IMember).allData?.find(
          ({ questionId: id }) => id === questionId
        ) ?? {};

      if (!value) return;

      // Need to ensure that we split the answers up for a MULTIPLE_SELECT.
      if (type === 'MULTIPLE_SELECT') {
        value.split(',').forEach((element: string) => {
          // If for whatever reason the splitted array returns a value that
          // is empty (has happened before), don't add it, just go to next.
          if (!element) return;

          // Increment the value accordingly.
          if (record[element]) record[element]++;
          else record[element] = 1;
        });
      }

      // Increment the value accordingly.
      else if (record[value]) record[value]++;
      else record[value] = 1;

      numResponses++;
    });

    return {
      data: Object.entries(record)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => (a.value < b.value ? 1 : -1)),
      numResponses
    };
  }, deepequal);

  return result;
};

export default () => {
  const initData = Chart.useStoreActions((store) => store.initData);
  const { data, numResponses } = useData();

  useEffect(() => {
    if (data && numResponses) initData({ data, numResponses });
  }, [data, numResponses]);

  return null;
};
