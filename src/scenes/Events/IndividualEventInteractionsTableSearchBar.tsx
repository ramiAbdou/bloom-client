import React, { useState } from 'react';

import SearchBar from '@components/molecules/SearchBar/SearchBar';

const IndividualEventInteractionsTableSearchBar: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const onChange = (updatedValue: string): void => {
    setValue(updatedValue);
  };

  return <SearchBar value={value} onChange={onChange} />;
};

export default IndividualEventInteractionsTableSearchBar;
