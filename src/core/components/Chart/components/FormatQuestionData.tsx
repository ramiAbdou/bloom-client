import deepequal from 'fast-deep-equal';
import { useEffect } from 'react';
import sw from 'stopword';

import { QuestionType } from '@constants';
import { IMember } from '@store/entities';
import { useStoreState } from '@store/Store';
import Chart, { ChartModelInitArgs, ChartType } from '../Chart.store';

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

    const sortedData = Object.entries(record)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => (a.value < b.value ? 1 : -1));

    return {
      data: type === 'LONG_TEXT' ? sortedData.slice(0, 100) : sortedData,
      totalResponses
    };
  }, deepequal);

  return result;
};

export default ({ questionId }: Pick<ChartModelInitArgs, 'questionId'>) => {
  const currentQuestionId = Chart.useStoreState((store) => store.questionId);
  const currentType = Chart.useStoreState((store) => store.type);
  const setData = Chart.useStoreActions((store) => store.setData);
  const setQuestionId = Chart.useStoreActions((store) => store.setQuestionId);
  const setType = Chart.useStoreActions((store) => store.setType);

  const type: QuestionType = useStoreState(
    ({ db }) => db.entities.questions.byId[questionId]?.type
  );

  const { data, totalResponses } = useQuestionData();

  useEffect(() => {
    if (questionId !== currentQuestionId) setQuestionId(questionId);
  }, [questionId]);

  // Controls the type of the chart, based on the type of the question.
  // - If the question is LONG_TEXT or SHORT_TEXT, the chart should be BAR.
  // - If the question is MULTIPLE_*, the chart should be PIE.
  // - If the users wants a time-series, that would be manually specified in
  // the props when the chart was created, not here.
  useEffect(() => {
    if (
      ['LONG_TEXT', 'SHORT_TEXT'].includes(type) &&
      currentType !== ChartType.BAR
    ) {
      setType(ChartType.BAR);
      return;
    }

    if (
      ['MULTIPLE_SELECT', 'MULTIPLE_CHOICE'].includes(type) &&
      currentType !== ChartType.PIE
    ) {
      setType(ChartType.PIE);
    }
  }, [type]);

  useEffect(() => {
    if (data && totalResponses) setData({ data, totalResponses });
  }, [data, totalResponses]);

  return null;
};
