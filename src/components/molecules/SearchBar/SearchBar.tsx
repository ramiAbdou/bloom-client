import React, { memo } from 'react';
import { IoCloseCircle, IoSearch } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { ClassNameProps, ValueProps } from '@constants';
import { cx } from '@util/util';

export interface SearchBarProps extends ClassNameProps, ValueProps {
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

const SearchBar: React.FC<SearchBarProps> = ({
  className,
  placeholder,
  onChange,
  value
}: SearchBarProps) => {
  const css = cx('c-misc-search', { [className]: className });

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
