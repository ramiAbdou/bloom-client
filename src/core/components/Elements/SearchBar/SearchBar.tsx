import React, { memo } from 'react';
import { IoCloseCircle, IoSearch } from 'react-icons/io5';

import Button from '@components/Button/Button';
import { ValueProps } from '@constants';
import { makeClass } from '@util/util';

interface SearchBarProps extends ValueProps {
  placeholder?: string;
  onChange: (value: string) => any;
}

const Icon = memo(() => <IoSearch />);

const ClearButton = ({ onChange, value }: Partial<SearchBarProps>) => {
  const onClick = () => onChange('');

  const css = makeClass([
    'c-misc-search-close',
    [!value, 'c-misc-search-close--empty']
  ]);

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
