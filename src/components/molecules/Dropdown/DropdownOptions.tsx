import { motion } from 'framer-motion';
import React from 'react';

import { ValueProps } from '@constants';
import Show from '@containers/Show';
import DropdownStore from './Dropdown.store';
import DropdownSearch from './DropdownSearch';
import useSelectOption from './useSelectOption';

const DropdownOption: React.FC<ValueProps> = ({ value }) => {
  const selectOption = useSelectOption(value);

  return (
    <button className="m-dropdown-option" type="button" onClick={selectOption}>
      <p>{value}</p>
    </button>
  );
};

const DropdownOptionList: React.FC = () => {
  const options = DropdownStore.useStoreState(({ filteredValues, value }) =>
    filteredValues.filter((option: string) => !value?.includes(option))
  );

  return (
    <Show show={!!options?.length}>
      <div>
        {options.map((value: string) => (
          <DropdownOption key={value} value={value} />
        ))}
      </div>
    </Show>
  );
};

const DropdownOptions: React.FC = () => {
  const isOpen = DropdownStore.useStoreState((store) => store.isOpen);
  const width = DropdownStore.useStoreState((store) => store.width);

  const noOptionsFound = DropdownStore.useStoreState(
    (store) => !store.filteredValues.length
  );

  return (
    <Show show={isOpen}>
      <motion.div
        animate={{ y: 0 }}
        className="m-dropdown-option-ctr"
        initial={{ y: -15 }}
        style={{ minWidth: width ?? 0 }}
      >
        <DropdownSearch />
        {noOptionsFound && <p>No results found.</p>}
        <DropdownOptionList />
      </motion.div>
    </Show>
  );
};

export default DropdownOptions;
