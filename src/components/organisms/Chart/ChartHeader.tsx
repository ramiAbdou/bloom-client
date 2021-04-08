import React from 'react';

import HeaderTag from '@atoms/Tag/HeaderTag';
import { IQuestion } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import ChartStore from './Chart.store';

const ChartHeader: React.FC = () => {
  const questionId = ChartStore.useStoreState((state) => state.questionId);

  const totalResponses = ChartStore.useStoreState(
    (state) => state.totalResponses
  );

  const currentTitle = ChartStore.useStoreState((state) => state.title);

  const { title } = useFindOne(IQuestion, {
    fields: ['title'],
    where: { id: questionId }
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
