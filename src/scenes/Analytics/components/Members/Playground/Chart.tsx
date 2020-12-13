import deepequal from 'fast-deep-equal';
import React from 'react';

import { useStoreState } from '@store/Store';
import Chart from '../../Chart/Chart';
import Playground from './Playground.store';

export default () => {
  const questionId = Playground.useStoreState((store) => store.questionId);

  const question = useStoreState(
    ({ db }) => db.entities.questions.byId[questionId],
    deepequal
  );

  return question?.id ? <Chart question={question} type="bar" /> : null;
};
