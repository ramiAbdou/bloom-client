import React, { ChangeEvent } from 'react';
import { IoSearch } from 'react-icons/io5';

import { ValueProps } from '@constants';

interface SearchBarProps extends ValueProps {
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => any;
}

export default ({ placeholder, onChange, value }: SearchBarProps) => (
  <div className="c-misc-search">
    <IoSearch />
    <input
      placeholder={placeholder ?? 'Search...'}
      type="text"
      value={value}
      onChange={onChange}
    />
  </div>
);
