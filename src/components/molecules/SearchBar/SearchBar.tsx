import React from 'react';
import { IoCloseCircle, IoSearch } from 'react-icons/io5';

import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import { BaseProps, ValueProps } from '@util/constants';
import { cx } from '@util/util';

export interface SearchBarProps extends BaseProps, ValueProps {
  placeholder?: string;
  onChange: (value: string) => any;
}

const SearchBarClearButton: React.FC<Partial<SearchBarProps>> = (props) => {
  const { onChange, value } = props;

  const onClick = () => {
    onChange('');
  };

  const css: string = cx('', { 'v-hidden': !value });

  return (
    <Button className={css} onClick={onClick}>
      <IoCloseCircle className="c-gray-3" />
    </Button>
  );
};

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const { className, placeholder, onChange, show, value } = props;

  if (show === false) return null;

  const css: string = cx(
    'c-misc-search bg-gray-5 br-sl c-gray-3 w-5 w-100--m',
    {},
    className
  );

  return (
    <Row className={css}>
      <IoSearch className="c-gray-3 mr-xs--nlc" />

      <input
        placeholder={placeholder ?? 'Search...'}
        type="text"
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />

      <SearchBarClearButton value={value} onChange={onChange} />
    </Row>
  );
};

export default SearchBar;
