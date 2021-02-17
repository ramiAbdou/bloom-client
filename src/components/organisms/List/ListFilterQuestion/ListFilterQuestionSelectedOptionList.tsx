import React from 'react';

import Attribute from '@atoms/Tag/Attribute';
import Row from '@containers/Row/Row';
import IdStore from '@store/Id.store';
import ListFilterStore from '../ListFilter/ListFilter.store';
import ListFilterQuestionStore from './ListFilterQuestion.store';

const ListFilterQuestionSelectedOptionList: React.FC = () => {
  const questionId: string = IdStore.useStoreState((store) => store.id);

  const openQuestionId = ListFilterStore.useStoreState(
    (state) => state.openQuestionId
  );

  const isOpen = questionId === openQuestionId;
  const values = ListFilterQuestionStore.useStoreState((state) => state.values);

  if (isOpen || !values?.length) return null;

  return (
    <Row className="mt-xs">
      {values.map((value: string) => {
        return <Attribute>{value}</Attribute>;
      })}
    </Row>
  );
};

export default ListFilterQuestionSelectedOptionList;
