import React, { useState } from 'react';

import SearchBar from '@components/molecules/SearchBar/SearchBar';
import { databaseSearchStringVar } from './MemberDatabase.reactive';

const MemberDatabaseSearchBar: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const onChange = (updatedValue: string): void => {
    setValue(updatedValue);
    databaseSearchStringVar(updatedValue);
  };

  return (
    <SearchBar
      placeholder="Search members..."
      value={value}
      onChange={onChange}
    />
  );
};

export default MemberDatabaseSearchBar;
