import React from 'react';

import { ValueProps } from '@constants';
import Dropdown from './Dropdown.store';
import DropdownSearch from './DropdownSearch';
import useSelectOption from './useSelectOption';

const DropdownOption: React.FC<ValueProps> = ({ value }) => {
  const selectOption = useSelectOption(value);

  return (
    <button className="o-dropdown-option" type="button" onClick={selectOption}>
      <p>{value}</p>
    </button>
  );
};

const DropdownOptionList: React.FC = () => {
  const options = Dropdown.useStoreState(({ filteredOptions, value }) =>
    filteredOptions.filter((option: string) => !value?.includes(option))
  );

  return (
    <div>
      {options.map((value: string) => (
        <DropdownOption key={value} value={value} />
      ))}
    </div>
  );
};

const DropdownOptions: React.FC = () => {
  const noOptionsFound = Dropdown.useStoreState(
    (store) => !store.filteredOptions.length
  );

  return (
    <div className="o-dropdown-option-ctr">
      <DropdownSearch />
      {noOptionsFound && <p>No results found.</p>}
      {!noOptionsFound && <DropdownOptionList />}
    </div>
  );
};

export default DropdownOptions;
