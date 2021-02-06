import React from 'react';

import Dropdown from './Dropdown.store';

const DropdownSearch: React.FC = () => {
  const searchString = Dropdown.useStoreState((store) => store.searchString);

  const setSearchString = Dropdown.useStoreActions(
    (store) => store.setSearchString
  );

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(target.value);
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
