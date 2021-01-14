import React from 'react';

import Dropdown from './Dropdown.store';
import Option from './Option';
import SearchInput from './SearchInput';

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
  const noOptionsFound = Dropdown.useStoreState(
    (store) => !store.filteredOptions.length
  );

  return (
    <div className="c-misc-dropdown-option-ctr">
      <SearchInput />
      {noOptionsFound && <p>No results found.</p>}
      {!noOptionsFound && <OptionList />}
    </div>
  );
}
