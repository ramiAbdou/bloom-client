import React from 'react';
import { IoCloseCircle, IoSearch } from 'react-icons/io5';

import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import { BaseProps, ValueProps } from '@util/constants';
import { cx } from '@util/util';

export interface SearchBarProps extends BaseProps, ValueProps {
  placeholder?: string;
  onChange: (value: string) => void;
}

const SearchBarClearButton: React.FC<Omit<SearchBarProps, 'className'>> = ({
  onChange,
  value
}) => {
  const onClick = (): void => {
    onChange('');
  };

  const css: string = cx('', { 'v-hidden': !value });

  return (
    <Button className={css} onClick={onClick}>
      <IoCloseCircle className="c-gray-3" />
    </Button>
  );
};

const SearchBarInput: React.FC<Omit<SearchBarProps, 'className'>> = ({
  placeholder,
  value,
  onChange
}) => (
  <input
    placeholder={placeholder ?? 'Search...'}
    type="text"
    value={value}
    onChange={({ target }) => onChange(target.value)}
  />
);

const SearchBar: React.FC<SearchBarProps> = ({
  className,
  ...props
}: SearchBarProps) => {
  const css: string = cx(
    'c-misc-search bg-gray-5 br-sl c-gray-3 w-5 w-100--m',
    {},
    className
  );

  return (
    <Row className={css}>
      <IoSearch className="c-gray-3 mr-xs--nlc" />
      <SearchBarInput {...props} />
      <SearchBarClearButton {...props} />
    </Row>
  );
};

export default SearchBar;
