import React from 'react';

import Row from '@containers/Row/Row';
import ListFilterActions from './ListFilterActions';
import ListFilterClearButton from './ListFilterClearButton';
import ListFilterQuestionList from './ListFilterQuestionList';

const ListFilterHeader: React.FC = () => {
  return (
    <Row className="mx-xs my-sm" justify="sb">
      <h3>Filters</h3>
      <ListFilterClearButton />
    </Row>
  );
};

const ListFilter: React.FC = () => {
  return (
    <>
      <ListFilterHeader />
      <ListFilterQuestionList />
      <ListFilterActions />
    </>
  );
};

export default ListFilter;
