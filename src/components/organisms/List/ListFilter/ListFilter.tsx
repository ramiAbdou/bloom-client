import React from 'react';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import ListFilterStore from './ListFilter.store';
import ListFilterHeader from './ListFilterHeader';
import ListFilterQuestionList from './ListFilterQuestionList';

const ListFilterAddButton: React.FC = () => {
  return (
    <Row className="mx-xs my-sm">
      <Button primary>Apply Filters</Button>
      <Button secondary>Cancel</Button>
    </Row>
  );
};

const ListFilter: React.FC = () => {
  return (
    <ListFilterStore.Provider>
      <ListFilterHeader />
      <ListFilterQuestionList />
      <ListFilterAddButton />
    </ListFilterStore.Provider>
  );
};

export default ListFilter;
