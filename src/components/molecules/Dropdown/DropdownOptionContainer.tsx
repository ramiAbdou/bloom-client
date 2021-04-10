import { motion } from 'framer-motion';
import React from 'react';

import Show from '@components/containers/Show';
import { ValueProps } from '@util/constants';
import { cx } from '@util/util';
import DropdownStore from './Dropdown.store';
import DropdownSearch from './DropdownSearch';
import useSelectOption from './useSelectOption';

const DropdownOption: React.FC<ValueProps> = ({ value }) => {
  const selectOption = useSelectOption(value);
  const css: string = cx('m-dropdown-option', {});

  return (
    <button className={css} type="button" onClick={selectOption}>
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
      <ul className="ma-h-4 o-scroll">
        {options.map((value: string) => (
          <DropdownOption key={value} value={value} />
        ))}
      </ul>
    </Show>
  );
};

const DropdownOptionContainer: React.FC = () => {
  const isOpen = DropdownStore.useStoreState((state) => state.isOpen);
  const width = DropdownStore.useStoreState((state) => state.width);

  const noOptionsFound = DropdownStore.useStoreState(
    (state) => !state.filteredValues.length
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

export default DropdownOptionContainer;
