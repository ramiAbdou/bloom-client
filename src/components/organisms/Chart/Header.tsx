import React from 'react';

import { HeaderTag } from '@atoms/Tags';
import { useStoreState } from '@store/Store';
import Chart from './Chart.store';

export default () => {
  const questionId = Chart.useStoreState((store) => store.questionId);
  const totalResponses = Chart.useStoreState((store) => store.totalResponses);
  const currentTitle = Chart.useStoreState((store) => store.title);

  const questionTitle = useStoreState(
    ({ db }) => db.entities.questions.byId[questionId]?.title
  );

  return (
    <div>
      <h4>{currentTitle ?? questionTitle}</h4>
      {totalResponses !== null && (
        <HeaderTag>{totalResponses} Responses</HeaderTag>
      )}
    </div>
  );
};
