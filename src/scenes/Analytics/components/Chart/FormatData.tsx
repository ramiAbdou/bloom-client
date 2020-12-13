import deepequal from 'fast-deep-equal';
import { useEffect } from 'react';

import { QuestionType } from '@constants';
import { IMember } from '@store/entities';
import { useStoreState } from '@store/Store';
import Chart, { ChartData, ChartModelInitArgs } from './Chart.store';

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

/**
 * Hook that updates the type of the chart to either bar or line depending
 * on a few conditions. Only bar and pie are supported here. If we wanted
 * to use a Line chart, note that this component wouldn't even be called.
 */
const usePieOrChart = () => {
  const chartType = Chart.useStoreState((store) => store.type);
  const setType = Chart.useStoreActions((store) => store.setType);

  const shouldBePie: boolean = Chart.useStoreState(({ data }) => {
    if (data?.length && data.length <= 5) return true;

    const totalValues = data.reduce(
      (acc: number, { value }: ChartData) => acc + value,
      0
    );

    const top5Values = data
      .slice(0, 5)
      .reduce((acc: number, { value }: ChartData) => acc + value, 0);

    return top5Values / totalValues >= 0.95;
  });

  useEffect(() => {
    if (shouldBePie && chartType !== 'pie') setType('pie');
    else if (!shouldBePie && chartType === 'pie') setType('bar');
  }, [shouldBePie]);
};

export default () => {
  const initData = Chart.useStoreActions((store) => store.initData);
  const { data, numResponses } = useData();
  usePieOrChart();

  useEffect(() => {
    if (data && numResponses) initData({ data, numResponses });
  }, [data, numResponses]);

  return null;
};
