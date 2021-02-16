import React, { useEffect } from 'react';

import { IdProps } from '@constants';
import IdStore from '@store/Id.store';
import { cx } from '@util/util';
import ListFilterStore from './ListFilter.store';
import ListFilterQuestionStore from './ListFilterQuestion.store';
import ListFilterQuestionHeader from './ListFilterQuestionHeader';
import ListFilterQuestionOptionList from './ListFilterQuestionOptionList';

const ListFilterQuestionContent: React.FC = () => {
  const questionId: string = IdStore.useStoreState((store) => store.id);
  const isOpen = ListFilterQuestionStore.useStoreState((state) => state.isOpen);

  const setIsOpen = ListFilterQuestionStore.useStoreActions(
    (state) => state.setIsOpen
  );

  const setValues = ListFilterQuestionStore.useStoreActions(
    (state) => state.setValues
  );

  const values = ListFilterStore.useStoreState((state) => {
    return state.filters[questionId]?.value ?? [];
  });

  useEffect(() => {
    setValues(values);
  }, [values]);

  const onClick = () => setIsOpen(!isOpen);

  const css = cx('o-list-filter-question', {
    'o-list-filter-question--active': isOpen
  });

  return (
    <div className={css} onClick={onClick}>
      <ListFilterQuestionHeader />
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
