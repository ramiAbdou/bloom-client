import { motion } from 'framer-motion';
import React from 'react';

import Show from '@components/containers/Show';
import { ValueProps } from '@util/constants';
import { cx } from '@util/util';
import { useDropdown, useDropdownSelector } from './Dropdown.state';
import { DropdownState } from './Dropdown.types';
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
  const [{ filteredValues, selectedValues }] = useDropdown();

  const options: string[] = filteredValues.filter(
    (option: string) => !selectedValues.includes(option)
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
  const [{ open, width }] = useDropdown();

  const hasFilteredValues: boolean = useDropdownSelector(
    (state: DropdownState) => !!state.filteredValues.length
  );

  if (!open) return null;

  return (
    <motion.div
      animate={{ y: 0 }}
      className="m-dropdown-option-ctr"
      initial={{ y: -15 }}
      style={{ minWidth: width ?? 0 }}
    >
      <DropdownSearch />
      {!hasFilteredValues && <p>No results found.</p>}
      <DropdownOptionList />
    </motion.div>
  );
};

export default DropdownOptionContainer;
