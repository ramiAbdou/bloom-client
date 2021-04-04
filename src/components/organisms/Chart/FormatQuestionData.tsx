import deepequal from 'fast-deep-equal';
import { useEffect } from 'react';
import sw from 'stopword';

import {
  IMember,
  IMemberType,
  IMemberValue,
  IQuestion
} from '@db/db.entities';
import { useStoreState } from '@store/Store';
import { QuestionCategory, QuestionType } from '@util/constants';
import Chart from './Chart.store';
import { ChartModelInitArgs, ChartType } from './Chart.types';

const useQuestionData = (): Pick<
  ChartModelInitArgs,
  'data' | 'totalResponses'
> => {
  const questionId = Chart.useStoreState((state) => state.questionId);

  const questionType: QuestionType = useStoreState(({ db }) => {
    const question: IQuestion = db.byQuestionId[questionId];
    return question?.type;
  });

  // Construct the data array and calculate the number of responses that
  // were valid for the question (not null).
  const result: ChartModelInitArgs = useStoreState(({ db }) => {
    const record: Record<string, number> = {};
    const { members } = db.community;

    // If the community doesn't have members loaded yet,
    if (!members?.length || !questionId) return { data: [], totalResponses: 0 };

    const { category }: IQuestion = db.byQuestionId[questionId];

    // Initialize a counter for the number of meaningful responses.
    let totalResponses = 0;

    members.forEach((memberId: string) => {
      const member: IMember = db.byMemberId[memberId];
      const memberType: IMemberType = db.byMemberTypeId[member.memberType];

      let value;

      if (category === QuestionCategory.MEMBER_TYPE) {
        value = memberType?.name;
      } else if (category === QuestionCategory.DUES_STATUS) {
        value = member.isDuesActive ? 'Paid' : 'Not Paid';
      } else {
        const d = member.memberValues.find((memberValueId: string) => {
          const data: IMemberValue = db.byMemberValuesId[memberValueId];
          const question: IQuestion = db.byQuestionId[data.question];
          return question.id === questionId;
        });

        value = db.byMemberValuesId[d]?.value;
      }

      if (!value) return;

      if (questionType === QuestionType.LONG_TEXT) {
        // We use stopwords to remove all of the common English words (ie: the).
        const wordArray: string[] = sw.removeStopwords(value.trim().split(' '));

        // Increment the record accordingly.
        wordArray.forEach((word: string) => {
          if (record[word]) record[word] += 1;
          else record[word] = 1;
        });
      } else if (questionType === QuestionType.MULTIPLE_SELECT) {
        value.split(',').forEach((element: string) => {
          // If for whatever reason the splitted array returns a value that
          // is empty (has happened before), don't add it, just go to next.
          if (!element) return;

          // Increment the value accordingly.
          if (record[element]) record[element] += 1;
          else record[element] = 1;
        });
      } else if (record[value]) record[value] += 1;
      else record[value] = 1;

      totalResponses += 1;
    });

    const sortedData = Object.entries(record)
      .map(([name, value]) => {
        return { name, value };
      })
      .sort((a, b) => (a.value < b.value ? 1 : -1));

    return {
      data:
        questionType === QuestionType.LONG_TEXT
          ? sortedData.slice(0, 100)
          : sortedData,
      totalResponses
    };
  }, deepequal);

  return result;
};

export default ({
  questionId
}: Pick<ChartModelInitArgs, 'questionId'>): any => {
  const currentQuestionId = Chart.useStoreState((state) => state.questionId);
  const currentType = Chart.useStoreState((state) => state.type);
  const setData = Chart.useStoreActions((state) => state.setData);
  const setQuestionId = Chart.useStoreActions((state) => state.setQuestionId);
  const setType = Chart.useStoreActions((state) => state.setType);

  const type: QuestionType = useStoreState(
    ({ db }) => db.byQuestionId[questionId]?.type
  );

  const { data, totalResponses } = useQuestionData();

  useEffect(() => {
    if (questionId !== currentQuestionId) setQuestionId(questionId);
  }, [questionId]);

  // Controls the type of the chart, based on the type of the question.
  // - If the question is LONG_TEXT or SHORT_TEXT, the chart should be BAR.
  // - If the question is MULTIPLE_*, the chart should be PIE.
  // - If the members wants a time-series, that would be manually specified in
  // the props when the chart was created, not here.
  useEffect(() => {
    if (
      ([QuestionType.LONG_TEXT, QuestionType.SHORT_TEXT].includes(type) ||
        (type === QuestionType.MULTIPLE_CHOICE && data.length >= 8)) &&
      currentType !== ChartType.BAR
    ) {
      setType(ChartType.BAR);
      return;
    }

    if (
      [QuestionType.MULTIPLE_SELECT, QuestionType.MULTIPLE_CHOICE].includes(
        type
      ) &&
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
