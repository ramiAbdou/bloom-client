import React from 'react';

import HeaderTag from '@components/atoms/Tag/HeaderTag';
import useFindOne from '@gql/hooks/useFindOne';
import { IQuestion } from '@util/constants.entities';
import ChartStore from './Chart.store';

const ChartHeader: React.FC = () => {
  const questionId = ChartStore.useStoreState((state) => state.questionId);

  const totalResponses = ChartStore.useStoreState(
    (state) => state.totalResponses
  );

  const currentTitle = ChartStore.useStoreState((state) => state.title);

  const { data: question, loading } = useFindOne(IQuestion, {
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
