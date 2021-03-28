import React from 'react';

import HeaderTag from '@atoms/Tag/HeaderTag';
import { useStoreState } from '@store/Store';
import Chart from './Chart.store';

const ChartHeader: React.FC = () => {
  const questionId = Chart.useStoreState((state) => {
    return state.questionId;
  });

  const totalResponses = Chart.useStoreState((state) => {
    return state.totalResponses;
  });

  const currentTitle = Chart.useStoreState((state) => {
    return state.title;
  });

  const title = useStoreState(({ db }) => {
    return db.byQuestionId[questionId]?.title;
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
