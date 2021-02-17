import React from 'react';
import { IoAdd } from 'react-icons/io5';

import Row from '@containers/Row/Row';
import { IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import ListFilterQuestionStore from './ListFilterQuestion.store';
import ListFilterQuestionDoneButton from './ListFilterQuestionDoneButton';

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
