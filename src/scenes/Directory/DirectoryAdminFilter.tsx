import React from 'react';
import { directoryIsAdminsOnlyVar } from 'src/reactive';

import { useReactiveVar } from '@apollo/client';
import QuickFilterButton from '@components/atoms/Button/QuickFilterButton';

const DirectoryAdminFilter: React.FC = () => {
  const directoryIsAdminsOnly: boolean = useReactiveVar(
    directoryIsAdminsOnlyVar
  );

  const onClick = (): void => {
    directoryIsAdminsOnlyVar(!directoryIsAdminsOnly);
  };

  return (
    <QuickFilterButton active={directoryIsAdminsOnly} onClick={onClick}>
      Filter: Admins Only
    </QuickFilterButton>
  );
};

export default DirectoryAdminFilter;
