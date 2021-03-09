import React, { useEffect } from 'react';

import IdStore from '@store/Id.store';
import { IdProps } from '@util/constants';
import { cx } from '@util/util';
import ListFilterStore from '../ListFilter/ListFilter.store';
import ListFilterQuestionStore from './ListFilterQuestion.store';
import ListFilterQuestionHeader from './ListFilterQuestionHeader';
import ListFilterQuestionOptionList from './ListFilterQuestionOptionList';
import ListFilterQuestionSelectedOptionList from './ListFilterQuestionSelectedOptionList';

const ListFilterQuestionContent: React.FC = () => {
  const questionId: string = IdStore.useStoreState((state) => state.id);

  const openQuestionId = ListFilterStore.useStoreState(
    (state) => state.openQuestionId
  );

  const setOpenQuestionId = ListFilterStore.useStoreActions(
    (state) => state.setOpenQuestionId
  );

  const isOpen = openQuestionId === questionId;

  const setQuestionValues = ListFilterQuestionStore.useStoreActions(
    (state) => state.setValues
  );

  const values = ListFilterStore.useStoreState((state) => {
    return state.filters[questionId]?.value ?? [];
  });

  useEffect(() => {
    setQuestionValues(values);
  }, [values]);

  const onClick = () => setOpenQuestionId(!isOpen ? questionId : null);

  const css: string = cx('o-list-filter-question', {
    'o-list-filter-question--active': isOpen
  });

  return (
    <div className={css} onClick={onClick}>
      <ListFilterQuestionHeader />
      <ListFilterQuestionSelectedOptionList />
      <ListFilterQuestionOptionList />
    </div>
  );
};

const ListFilterQuestion: React.FC<IdProps> = ({ id: questionId }) => {
  return (
    <IdStore.Provider runtimeModel={{ id: questionId }}>
      <ListFilterQuestionStore.Provider>
        <ListFilterQuestionContent />
      </ListFilterQuestionStore.Provider>
    </IdStore.Provider>
  );
};

export default ListFilterQuestion;
