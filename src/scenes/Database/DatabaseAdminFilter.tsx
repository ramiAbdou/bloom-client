import React from 'react';

import { useReactiveVar } from '@apollo/client';
import QuickFilterButton from '@components/atoms/Button/QuickFilterButton';
import { databaseIsAdminsOnlyVar } from './Database.reactive';

const DatabaseAdminFilter: React.FC = () => {
  const databaseIsAdminsOnly: boolean = useReactiveVar(databaseIsAdminsOnlyVar);

  const onClick = (): void => {
    databaseIsAdminsOnlyVar(!databaseIsAdminsOnly);
  };

  return (
    <QuickFilterButton active={databaseIsAdminsOnly} onClick={onClick}>
      Filter: Admins Only
    </QuickFilterButton>
  );
};

export default DatabaseAdminFilter;
