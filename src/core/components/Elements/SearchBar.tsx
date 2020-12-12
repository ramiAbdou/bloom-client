import React, { ChangeEvent, memo } from 'react';
import { IoCloseCircle, IoSearch } from 'react-icons/io5';

import Button from '@components/Button/Button';
import { ValueProps } from '@constants';
import { makeClass } from '@util/util';

interface SearchBarProps extends ValueProps {
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => any;
  onClear?: () => any;
}

const Icon = memo(() => <IoSearch />);

const ClearButton = ({ onClear, value }: Partial<SearchBarProps>) => {
  const css = makeClass([
    'c-misc-search-close',
    [!value, 'c-misc-search-close--hide']
  ]);

  return (
    <Button className={css} onClick={onClear}>
      <IoCloseCircle />
    </Button>
  );
};

export default memo(
  ({ placeholder, onChange, onClear, value }: SearchBarProps) => (
    <div className="c-misc-search">
      <Icon />
      <input
        placeholder={placeholder ?? 'Search...'}
        type="text"
        value={value}
        onChange={onChange}
      />

      {onClear && <ClearButton value={value} onClear={onClear} />}
    </div>
  )
);
