import deepequal from 'fast-deep-equal';
import { useEffect } from 'react';
import sw from 'stopword';

import { QuestionType } from '@constants';
import { IMember } from '@store/entities';
import { useStoreState } from '@store/Store';
import Chart, { ChartModelInitArgs } from './Chart.store';

const useQuestionData = (): Pick<
  ChartModelInitArgs,
  'data' | 'totalResponses'
> => {
  const questionId = Chart.useStoreState((store) => store.questionId);

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
    if (!members?.length || !questionId) return { data: [], totalResponses: 0 };

    // Initialize a counter for the number of meaningful responses.
    let totalResponses = 0;

    members.forEach((memberId: string) => {
      const { value } =
        (byMemberId[memberId] as IMember).allData?.find(
          ({ questionId: id }) => id === questionId
        ) ?? {};

      if (!value) return;

      if (type === 'LONG_TEXT') {
        // We use stopwords to remove all of the common English words (ie: the).
        const wordArray: string[] = sw.removeStopwords(value.trim().split(' '));

        // Increment the record accordingly.
        wordArray.forEach((word: string) => {
          if (record[word]) record[word]++;
          else record[word] = 1;
        });
      } else if (type === 'MULTIPLE_SELECT') {
        value.split(',').forEach((element: string) => {
          // If for whatever reason the splitted array returns a value that
          // is empty (has happened before), don't add it, just go to next.
          if (!element) return;

          // Increment the value accordingly.
          if (record[element]) record[element]++;
          else record[element] = 1;
        });
      } else if (record[value]) record[value]++;
      else record[value] = 1;

      totalResponses++;
    });

    const sortedData = Object.entries(record).map(([name, value]) => ({
      name,
      value
    }));

    return {
      data: type === 'LONG_TEXT' ? sortedData.slice(0, 100) : sortedData,
      totalResponses
    };
  }, deepequal);

  return result;
};

export default () => {
  const setData = Chart.useStoreActions((store) => store.setData);
  const { data, totalResponses } = useQuestionData();

  useEffect(() => {
    if (data && totalResponses) setData({ data, totalResponses });
  }, [data, totalResponses]);

  return null;
};
