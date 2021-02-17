import React from 'react';
import { IoAdd } from 'react-icons/io5';

import Row from '@containers/Row/Row';
import { IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import ListFilterStore from '../ListFilter/ListFilter.store';

const ListFilterQuestionHeader: React.FC = () => {
  const questionId: string = IdStore.useStoreState((store) => store.id);

  const openQuestionId = ListFilterStore.useStoreState(
    (state) => state.openQuestionId
  );

  const isOpen = questionId === openQuestionId;

  const title: string = useStoreState(({ db }) => {
    const question: IQuestion = db.byQuestionId[questionId];
    return question?.title;
  });

  return (
    <Row className="w-100" justify="sb" spacing="xs">
      <h4 className="overflow-ellipses">{title}</h4>
      {!isOpen && <IoAdd />}
    </Row>
  );
};

export default ListFilterQuestionHeader;
