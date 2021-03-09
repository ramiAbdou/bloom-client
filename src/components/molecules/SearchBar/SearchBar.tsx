import React, { memo } from 'react';
import { IoCloseCircle, IoSearch } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { BaseProps, ValueProps } from '@util/constants';
import { cx } from '@util/util';

export interface SearchBarProps extends BaseProps, ValueProps {
  placeholder?: string;
  onChange: (value: string) => any;
}

const Icon = memo(() => <IoSearch />);

const ClearButton = ({ onChange, value }: Partial<SearchBarProps>) => {
  const onClick = () => onChange('');

  const css: string = cx('c-misc-search-close', {
    'c-misc-search-close--empty': !value
  });

  return (
    <Button className={css} onClick={onClick}>
      <IoCloseCircle />
    </Button>
  );
};

const SearchBar: React.FC<SearchBarProps> = ({
  className,
  placeholder,
  onChange,
  show,
  value
}: SearchBarProps) => {
  const css: string = cx('c-misc-search', {}, className);
  if (show === false) return null;

  return (
    <div className={css}>
      <Icon />
      <input
        placeholder={placeholder ?? 'Search...'}
        type="text"
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />

      <ClearButton value={value} onChange={onChange} />
    </div>
  );
};

export default SearchBar;
