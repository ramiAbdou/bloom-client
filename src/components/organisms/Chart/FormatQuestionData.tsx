import deepequal from 'fast-deep-equal';
import { useEffect } from 'react';
import sw from 'stopword';

import { QuestionType } from '@constants';
import {
  IMember,
  IMemberData,
  IMemberType,
  IQuestion,
  IUser
} from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import Chart from './Chart.store';
import { ChartModelInitArgs, ChartType } from './Chart.types';

const useQuestionData = (): Pick<
  ChartModelInitArgs,
  'data' | 'totalResponses'
> => {
  const questionId = Chart.useStoreState((store) => store.questionId);

  const questionType: QuestionType = useStoreState(
    ({ db }) => db.entities.questions.byId[questionId]?.type
  );

  // Construct the data array and calculate the number of responses that
  // were valid for the question (not null).
  const result: ChartModelInitArgs = useStoreState(({ db }) => {
    const record: Record<string, number> = {};

    const { byId: byDataId } = db.entities.data;
    const { byId: byMemberId } = db.entities.members;
    const { byId: byQuestionId } = db.entities.questions;
    const { byId: byTypeId } = db.entities.types;
    const { byId: byUserId } = db.entities.users;

    const { members } = db.community;

    // If the community doesn't have members loaded yet,
    if (!members?.length || !questionId) return { data: [], totalResponses: 0 };

    const { category }: IQuestion = byQuestionId[questionId];

    // Initialize a counter for the number of meaningful responses.
    let totalResponses = 0;

    members.forEach((memberId: string) => {
      const member: IMember = byMemberId[memberId];
      const type: IMemberType = byTypeId[member.type];
      const user: IUser = byUserId[member.user];

      let value;

      if (category === 'MEMBERSHIP_TYPE') value = type?.name;
      else if (category === 'GENDER') value = user.gender;
      else if (category === 'DUES_STATUS') {
        value = member.isDuesActive ? 'Active' : 'Inactive';
      } else {
        const d = member.data.find((dataId: string) => {
          const data: IMemberData = byDataId[dataId];
          const question: IQuestion = byQuestionId[data.question];
          return question.id === questionId;
        });

        value = byDataId[d]?.value;
      }

      if (!value) return;

      if (questionType === 'LONG_TEXT') {
        // We use stopwords to remove all of the common English words (ie: the).
        const wordArray: string[] = sw.removeStopwords(value.trim().split(' '));

        // Increment the record accordingly.
        wordArray.forEach((word: string) => {
          if (record[word]) record[word]++;
          else record[word] = 1;
        });
      } else if (questionType === 'MULTIPLE_SELECT') {
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
      data:
        questionType === 'LONG_TEXT' ? sortedData.slice(0, 100) : sortedData,
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
      (['LONG_TEXT', 'SHORT_TEXT'].includes(type) ||
        (type === 'MULTIPLE_CHOICE' && data.length >= 8)) &&
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
  }, [data?.length, type]);

  useEffect(() => {
    if (data !== null && totalResponses !== null) {
      setData({ data, totalResponses });
    }
  }, [data, totalResponses]);

  return null;
};
