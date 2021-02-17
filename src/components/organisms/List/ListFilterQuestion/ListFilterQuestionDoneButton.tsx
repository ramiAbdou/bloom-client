import React from 'react';

import Button from '@atoms/Button/Button';
import IdStore from '@store/Id.store';
import ListFilterStore from '../ListFilter/ListFilter.store';
import ListFilterQuestionStore from './ListFilterQuestion.store';

const ListFilterQuestionDoneButton: React.FC = () => {
  const questionId: string = IdStore.useStoreState((store) => store.id);
  const values = ListFilterQuestionStore.useStoreState((state) => state.values);

  const openQuestionId = ListFilterStore.useStoreState(
    (state) => state.openQuestionId
  );

  const setOpenQuestionId = ListFilterStore.useStoreActions(
    (state) => state.setOpenQuestionId
  );

  const setFilter = ListFilterStore.useStoreActions((state) => state.setFilter);

  const onClick = () => {
    setFilter({ questionId, value: values });
    setOpenQuestionId(null);
  };

  return (
    <Button
      stopPropagation
      tertiary
      show={openQuestionId === questionId}
      onClick={onClick}
    >
      Done
    </Button>
  );
};

export default ListFilterQuestionDoneButton;
