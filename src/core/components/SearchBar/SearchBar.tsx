/**
 * @fileoverview Component: SearchBar
 * @author Rami Abdou
 */

import './SearchBar.scss';

import React from 'react';
import { Search } from 'react-feather';

type SearchBarProps = { placeholder?: string; onChange?: any; value: string };

export default ({ placeholder, onChange, value }: SearchBarProps) => (
  <div className="c-form-input c-search">
    <Search color="#828282" />
    <input
      placeholder={placeholder ?? ''}
      type="text"
      value={value}
      onChange={onChange}
    />
  </div>
);
