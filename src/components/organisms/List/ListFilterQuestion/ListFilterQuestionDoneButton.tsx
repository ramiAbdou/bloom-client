import React from 'react';

import Button from '@atoms/Button/Button';
import IdStore from '@store/Id.store';
import ListFilterStore from '../ListFilter/ListFilter.store';
import ListFilterQuestionStore from './ListFilterQuestion.store';

const ListFilterQuestionDoneButton: React.FC = () => {
  const questionId: string = IdStore.useStoreState((store) => store.id);
  const setFilter = ListFilterStore.useStoreActions((state) => state.setFilter);
  const isOpen = ListFilterQuestionStore.useStoreState((state) => state.isOpen);
  const values = ListFilterQuestionStore.useStoreState((state) => state.values);

  const setIsQuestionOpen = ListFilterQuestionStore.useStoreActions(
    (state) => state.setIsOpen
  );

  const onClick = () => {
    setFilter({ questionId, value: values });
    setIsQuestionOpen(false);
  };

  return (
    <Button stopPropagation tertiary show={isOpen} onClick={onClick}>
      Done
    </Button>
  );
};

export default ListFilterQuestionDoneButton;
