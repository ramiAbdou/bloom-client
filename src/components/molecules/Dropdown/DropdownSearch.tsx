import React from 'react';

import { useDropdown, useDropdownSelector } from './Dropdown.state';
import { DropdownState } from './Dropdown.types';

const DropdownSearch: React.FC = () => {
  const [{ searchString }, dropdownDispatch] = useDropdown();

  const showSearchBar: boolean = useDropdownSelector(
    ({ values }: DropdownState) => values.length >= 5
  );

  if (!showSearchBar) return null;

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    dropdownDispatch({ searchString: target.value, type: 'SET_SEARCH_STRING' });
  };

  return (
    <input
      className="m-dropdown-search"
      placeholder="Search..."
      type="text"
      value={searchString}
      onChange={onChange}
    />
  );
};

export default DropdownSearch;
