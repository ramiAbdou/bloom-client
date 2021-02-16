import React from 'react';

import { IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import ListFilterQuestion from './ListFilterQuestion';

const ListFilterQuestionList: React.FC = () => {
  const questionIds: string[] = useStoreState(({ db }) => {
    return db.community.questions?.filter((questionId: string) => {
      const question: IQuestion = db.byQuestionId[questionId];
      return ['MULTIPLE_CHOICE', 'MULTIPLE_SELECT'].includes(question.type);
    });
  });

  return (
    <ul className="mb-sm">
      {questionIds?.map((questionId: string) => {
        return <ListFilterQuestion key={questionId} id={questionId} />;
      })}
    </ul>
  );
};

export default ListFilterQuestionList;
