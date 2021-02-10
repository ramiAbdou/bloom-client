import React from 'react';

import Show from '@containers/Show';
import DropdownStore from './Dropdown.store';

const DropdownSearch: React.FC = () => {
  const show: boolean = DropdownStore.useStoreState(
    ({ values }) => values?.length >= 5
  );

  const value = DropdownStore.useStoreState((store) => store.searchString);

  const setSearchString = DropdownStore.useStoreActions(
    (store) => store.setSearchString
  );

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(target.value);
  };

  return (
    <Show show={show}>
      <input
        className="m-dropdown-search"
        placeholder="Search..."
        type="text"
        value={value}
        onChange={onChange}
      />
    </Show>
  );
};

export default DropdownSearch;
