import React from 'react';

import HeaderTag from '@components/atoms/Tag/HeaderTag';
import { IQuestion } from '@core/db/db.entities';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import ChartStore from './Chart.store';

const ChartHeader: React.FC = () => {
  const questionId = ChartStore.useStoreState((state) => state.questionId);

  const totalResponses = ChartStore.useStoreState(
    (state) => state.totalResponses
  );

  const currentTitle = ChartStore.useStoreState((state) => state.title);

  const { data: question, loading } = useFindOneFull(IQuestion, {
    fields: ['title'],
    where: { id: questionId }
  });

  if (loading) return null;

  return (
    <div>
      <h4>{currentTitle ?? question.title}</h4>
      {totalResponses !== null && (
        <HeaderTag>{totalResponses} Responses</HeaderTag>
      )}
    </div>
  );
};

export default ChartHeader;
