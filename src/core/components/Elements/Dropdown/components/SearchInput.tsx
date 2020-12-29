import React from 'react';

import Dropdown from '../Dropdown.store';

export default function SearchInput() {
  const searchString = Dropdown.useStoreState((store) => store.searchString);

  const setSearchString = Dropdown.useStoreActions(
    (store) => store.setSearchString
  );

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(target.value);
  };

  return (
    <input
      className="c-form-dd-search"
      placeholder="Search..."
      type="text"
      value={searchString}
      onChange={onChange}
    />
  );
}
