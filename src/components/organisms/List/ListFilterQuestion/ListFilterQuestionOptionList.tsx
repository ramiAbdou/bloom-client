import React from 'react';

import { IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import ListFilterQuestionStore from './ListFilterQuestion.store';
import ListFilterQuestionOption from './ListFilterQuestionOption';

const ListFilterQuestionOptionList: React.FC = () => {
  const questionId: string = IdStore.useStoreState((store) => store.id);
  const isOpen = ListFilterQuestionStore.useStoreState((state) => state.isOpen);

  const options: string[] = useStoreState(({ db }) => {
    const question: IQuestion = db.byQuestionId[questionId];
    return question?.options;
  });

  if (!isOpen) return null;

  return (
    <ul className="my-xs">
      {options.map((option: string) => {
        return <ListFilterQuestionOption key={option} value={option} />;
      })}
    </ul>
  );
};

export default ListFilterQuestionOptionList;
