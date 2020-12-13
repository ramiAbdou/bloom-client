import deepequal from 'fast-deep-equal';
import { useEffect } from 'react';
import sw from 'stopword';

import { IMember } from '@store/entities';
import { useStoreState } from '@store/Store';
import Chart, { ChartModelInitArgs } from './Chart.store';

const useLongData = (): ChartModelInitArgs => {
  const questionId = Chart.useStoreState((store) => store.question?.id);

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

      // We use stopwords to remove all of the common English words (ie: the).
      const wordArray: string[] = sw.removeStopwords(value.trim().split(' '));

      // Increment the record accordingly.
      wordArray.forEach((word: string) => {
        if (record[word]) record[word]++;
        else record[word] = 1;
      });

      numResponses++;
    });

    // We only return the first 100 words, since there will most likely be
    // an absurd amount of words.
    return {
      data: Object.entries(record)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => (a.value < b.value ? 1 : -1))
        .slice(0, 100),
      numResponses
    };
  }, deepequal);

  return result;
};

export default () => {
  const initData = Chart.useStoreActions((store) => store.initData);
  const { data, numResponses } = useLongData();

  useEffect(() => {
    if (data && numResponses) initData({ data, numResponses });
  }, [data, numResponses]);

  return null;
};
