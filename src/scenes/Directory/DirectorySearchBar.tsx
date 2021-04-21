import React, { useState } from 'react';
import { directorySearchStringVar } from 'src/reactive';

import SearchBar from '@components/molecules/SearchBar/SearchBar';

const DirectorySearchBar: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const onChange = (element: string): void => {
    directorySearchStringVar(element);
    setValue(element);
  };

  return <SearchBar className="w-100--m" value={value} onChange={onChange} />;
};

export default DirectorySearchBar;
