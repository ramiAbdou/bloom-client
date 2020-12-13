import deepequal from 'fast-deep-equal';
import React from 'react';

import { useStoreState } from '@store/Store';
import Chart from '../../Chart/Chart';
import { ChartData } from '../../Chart/Chart.store';
import useShortTextData from '../../Chart/useShortTextData';
import Playground from './Playground.store';

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
