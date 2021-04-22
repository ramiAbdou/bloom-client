import React, { useState } from 'react';

import SearchBar from '@components/molecules/SearchBar/SearchBar';
import { eventsPastSearchStringVar } from './Events.reactive';

const EventsPastSearchBar: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const onChange = (updatedValue: string): void => {
    setValue(updatedValue);
    eventsPastSearchStringVar(updatedValue);
  };

  return <SearchBar className="mb-sm" value={value} onChange={onChange} />;
};

export default EventsPastSearchBar;
