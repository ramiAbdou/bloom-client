import React, { useState } from 'react';

import SearchBar from '@components/molecules/SearchBar/SearchBar';
import { directorySearchStringVar } from './Directory.reactive';

const DirectorySearchBar: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const onChange = (element: string): void => {
    directorySearchStringVar(element);
    setValue(element);
  };

  return <SearchBar className="w-100--m" value={value} onChange={onChange} />;
};

export default DirectorySearchBar;
