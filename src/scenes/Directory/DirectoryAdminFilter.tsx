import React from 'react';
import { directoryIsAdminsOnlyVar } from 'src/reactive';

import Button from '@components/atoms/Button/Button';

const DirectoryAdminFilter: React.FC = () => {
  // const

  const onClick = (): void => {
    directoryIsAdminsOnlyVar(true);
  };

  return <Button onClick={onClick}>Filter: Admins Only</Button>;
};

export default DirectoryAdminFilter;
