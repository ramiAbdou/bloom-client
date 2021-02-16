import React from 'react';

import ListFilterActions from './ListFilterActions';
import ListFilterHeader from './ListFilterHeader';
import ListFilterQuestionList from './ListFilterQuestionList';

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
