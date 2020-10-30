/**
 * @fileoverview Component: SearchBar
 * @author Rami Abdou
 */

import './SearchBar.scss';

import React from 'react';
import { Search } from 'react-feather';

import { useActive } from '@hooks/useActive';
import { useStoreState } from '@store/Store';

type SearchBarProps = { placeholder?: string };

export default ({ placeholder }: SearchBarProps) => {
  const [activeRef, isActive] = useActive();
  const primaryColor = useStoreState((store) => store.primaryColor);

  return (
    <div ref={activeRef} className="c-form-input c-search">
      <Search color="#828282" />
      <input placeholder={placeholder ?? ''} type="text" />
    </div>
  );
};
