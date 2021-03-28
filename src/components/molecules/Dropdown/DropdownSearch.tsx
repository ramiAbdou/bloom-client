import React from 'react';

import Show from '@containers/Show';
import DropdownStore from './Dropdown.store';

const DropdownSearch: React.FC = () => {
  const show: boolean = DropdownStore.useStoreState(({ values }) => {
    return values?.length >= 5;
  });

  const value = DropdownStore.useStoreState((state) => {
    return state.searchString;
  });

  const setSearchString = DropdownStore.useStoreActions((state) => {
    return state.setSearchString;
  });

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
