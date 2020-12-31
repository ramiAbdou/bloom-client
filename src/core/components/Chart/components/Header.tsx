import React from 'react';

import NumberTag from '@components/Tags/NumberTag';
import { useStoreState } from '@store/Store';
import Chart from '../Chart.store';

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
        <NumberTag value={`${totalResponses} Responses`} />
      )}
    </div>
  );
};
