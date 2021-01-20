import React, { memo } from 'react';
import { IoCloseCircle, IoSearch } from 'react-icons/io5';

import Button from '@atoms/Button';
import { ValueProps } from '@constants';
import { cx } from '@util/util';

export interface SearchBarProps extends ValueProps {
  placeholder?: string;
  onChange: (value: string) => any;
}

const Icon = memo(() => <IoSearch />);

const ClearButton = ({ onChange, value }: Partial<SearchBarProps>) => {
  const onClick = () => onChange('');

  const css = cx('c-misc-search-close', {
    'c-misc-search-close--empty': !value
  });

  return (
    <Button className={css} onClick={onClick}>
      <IoCloseCircle />
    </Button>
  );
};

export default memo(({ placeholder, onChange, value }: SearchBarProps) => (
  <div className="c-misc-search">
    <Icon />
    <input
      placeholder={placeholder ?? 'Search...'}
      type="text"
      value={value}
      onChange={({ target }) => onChange(target.value)}
    />

    <ClearButton value={value} onChange={onChange} />
  </div>
));
