import React, { ChangeEvent, memo } from 'react';
import { IoSearch } from 'react-icons/io5';

import { ValueProps } from '@constants';

interface SearchBarProps extends ValueProps {
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => any;
}

const Icon = memo(() => <IoSearch />);

export default memo(({ placeholder, onChange, value }: SearchBarProps) => (
  <div className="c-misc-search">
    <Icon />
    <input
      placeholder={placeholder ?? 'Search...'}
      type="text"
      value={value}
      onChange={onChange}
    />
  </div>
));
