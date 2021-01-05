import React from 'react';

import Option from '../components/Option';
import SearchInput from '../components/SearchInput';
import Dropdown from '../Dropdown.store';

const OptionList = () => {
  const options = Dropdown.useStoreState(({ filteredOptions, value }) =>
    filteredOptions.filter((option: string) => !value?.includes(option))
  );

  return (
    <div>
      {options.map((option: string) => (
        <Option key={option} option={option} />
      ))}
    </div>
  );
};

export default function OptionContainer() {
  const width = Dropdown.useStoreState((store) => store.width);

  const noOptionsFound = Dropdown.useStoreState(
    (store) => !store.filteredOptions.length
  );

  return (
    <div
      className="c-misc-dropdown-option-ctr"
      style={{ minWidth: width ?? 0 }}
    >
      <SearchInput />
      {noOptionsFound && <p>No results found.</p>}
      {!noOptionsFound && <OptionList />}
    </div>
  );
}
