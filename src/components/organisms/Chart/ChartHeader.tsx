import React from 'react';

import HeaderTag from '@atoms/Tag/HeaderTag';
import { useStoreState } from '@store/Store';
import Chart from './Chart.store';

const ChartHeader: React.FC = () => {
  const questionId = Chart.useStoreState((store) => store.questionId);
  const totalResponses = Chart.useStoreState((store) => store.totalResponses);
  const currentTitle = Chart.useStoreState((store) => store.title);

  const title = useStoreState(({ db }) => {
    const { byId: byQuestionId } = db.entities.questions;
    return byQuestionId[questionId]?.title;
  });

  return (
    <div>
      <h4>{currentTitle ?? title}</h4>
      {totalResponses !== null && (
        <HeaderTag>{totalResponses} Responses</HeaderTag>
      )}
    </div>
  );
};

export default ChartHeader;
