import React from 'react';

import { IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import ListFilterStore from '../ListFilter/ListFilter.store';
import ListFilterQuestionOption from './ListFilterQuestionOption';

const ListFilterQuestionOptionList: React.FC = () => {
  const questionId: string = IdStore.useStoreState((store) => store.id);

  const openQuestionId = ListFilterStore.useStoreState(
    (state) => state.openQuestionId
  );

  const isOpen = questionId === openQuestionId;

  const options: string[] = useStoreState(({ db }) => {
    const question: IQuestion = db.byQuestionId[questionId];
    return question?.options;
  });

  if (!isOpen) return null;

  return (
    <ul className="mt-sm o-list-filter-question-option-list">
      {options.map((option: string) => {
        return <ListFilterQuestionOption key={option} value={option} />;
      })}
    </ul>
  );
};

export default ListFilterQuestionOptionList;
