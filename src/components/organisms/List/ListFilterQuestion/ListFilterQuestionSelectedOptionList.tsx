import React from 'react';

import Attribute from '@atoms/Tag/Attribute';
import Row from '@containers/Row/Row';
import IdStore from '@store/Id.store';
import ListFilterStore from '../ListFilter/ListFilter.store';
import ListFilterQuestionStore from './ListFilterQuestion.store';

const ListFilterQuestionSelectedOptionList: React.FC = () => {
  const questionId: string = IdStore.useStoreState((state) => {
    return state.id;
  });

  const openQuestionId = ListFilterStore.useStoreState((state) => {
    return state.openQuestionId;
  });

  const isOpen = questionId === openQuestionId;

  const values = ListFilterQuestionStore.useStoreState((state) => {
    return state.values;
  });

  if (isOpen || !values?.length) return null;

  return (
    <Row wrap className="mt-xs" gap="xxs">
      {values.map((value: string) => {
        return <Attribute>{value}</Attribute>;
      })}
    </Row>
  );
};

export default ListFilterQuestionSelectedOptionList;
