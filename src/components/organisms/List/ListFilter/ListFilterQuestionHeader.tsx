import React from 'react';
import { IoAdd } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import { IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import ListFilterStore from './ListFilter.store';
import ListFilterQuestionStore from './ListFilterQuestion.store';

const ListFilterQuestionDoneButton: React.FC = () => {
  const questionId: string = IdStore.useStoreState((store) => store.id);
  const setFilter = ListFilterStore.useStoreActions((state) => state.setFilter);
  const isOpen = ListFilterQuestionStore.useStoreState((state) => state.isOpen);
  const values = ListFilterQuestionStore.useStoreState((state) => state.values);

  const setIsOpen = ListFilterQuestionStore.useStoreActions(
    (state) => state.setIsOpen
  );

  const onClick = () => {
    setFilter({ questionId, value: values });
    setIsOpen(false);
  };

  return (
    <Button stopPropagation tertiary show={isOpen} onClick={onClick}>
      Done
    </Button>
  );
};

const ListFilterQuestionHeader: React.FC = () => {
  const questionId: string = IdStore.useStoreState((store) => store.id);
  const isOpen = ListFilterQuestionStore.useStoreState((state) => state.isOpen);

  const title: string = useStoreState(({ db }) => {
    const question: IQuestion = db.byQuestionId[questionId];
    return question?.title;
  });

  return (
    <Row className="w-fill" justify="sb">
      <h4 className="overflow-ellipses">{title}</h4>
      {!isOpen && <IoAdd />}
      <ListFilterQuestionDoneButton />
    </Row>
  );
};

export default ListFilterQuestionHeader;
