import React from 'react';

import Attribute from '@atoms/Tag/Attribute';
import Row from '@containers/Row/Row';
import ListFilterQuestionStore from './ListFilterQuestion.store';

const ListFilterQuestionSelectedOptionList: React.FC = () => {
  const isOpen = ListFilterQuestionStore.useStoreState((state) => state.isOpen);
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
