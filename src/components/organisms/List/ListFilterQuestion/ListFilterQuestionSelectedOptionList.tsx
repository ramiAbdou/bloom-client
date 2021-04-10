import React from 'react';

import Attribute from '@components/atoms/Tag/Attribute';
import Row from '@components/containers/Row/Row';
import IdStore from '@store/Id.store';
import ListFilterStore from '../ListFilter/ListFilter.store';
import ListFilterQuestionStore from './ListFilterQuestion.store';

const ListFilterQuestionSelectedOptionList: React.FC = () => {
  const questionId: string = IdStore.useStoreState((state) => state.id);

  const openQuestionId = ListFilterStore.useStoreState(
    (state) => state.openQuestionId
  );

  const isOpen = questionId === openQuestionId;
  const values = ListFilterQuestionStore.useStoreState((state) => state.values);

  if (isOpen || !values?.length) return null;

  return (
    <Row wrap className="mt-xs" gap="xxs">
      {values.map((value: string) => (
        <Attribute>{value}</Attribute>
      ))}
    </Row>
  );
};

export default ListFilterQuestionSelectedOptionList;
