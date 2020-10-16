/**
 * @fileoverview Component: Dropdown
 * - Dropdown option in a form where a user chooses between different values.
 * Can only select 1 option.
 * @author Rami Abdou
 */

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { Form } from '@components/Form';
import { FormItemData } from '../Form.types';
import DropdownProvider, { useDropdown } from './Dropdown.state';

type OptionProps = { selectOption: VoidFunction; option: string };
type ValueProps = { value?: string };

const SearchBar = () => {
  const { searchString, setSearchString } = useDropdown();

  return (
    <input
      className="c-form-dd-search"
      placeholder="Search..."
      type="text"
      value={searchString}
      onChange={({ target }) => setSearchString(target.value)}
    />
  );
};

const Option = ({ selectOption, option }: OptionProps) => (
  <button className="c-form-dd-opt" onClick={selectOption}>
    <p className="c-form-dd-opt__txt">{option}</p>
  </button>
);

const NoResultsMessage = () => (
  <p className="c-form-dd-no-result">No results found.</p>
);

const AllOptions = () => {
  const { filteredOptions, setSearchString, title } = useDropdown();
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const selectOption = (option) => {
    updateItem({ isActive: false, title, value: option });
    setSearchString('');
  };

  return (
    <>
      {filteredOptions.map((option) => (
        <Option
          key={option}
          option={option}
          selectOption={() => selectOption(option)}
        />
      ))}
    </>
  );
};

const OptionContainer = () => {
  const { filteredOptions, width } = useDropdown();
  const noOptionsFound = !filteredOptions.length;

  return (
    <AnimatePresence>
      <motion.div
        className="c-form-dd-opt-ctr"
        style={{ width: width ?? 0 }}
        transition={{ duration: 0.25 }}
      >
        <SearchBar />
        {noOptionsFound && <NoResultsMessage />}
        {!noOptionsFound && <AllOptions />}
      </motion.div>
    </AnimatePresence>
  );
};

const Value = ({ value }: ValueProps) => {
  const { title } = useDropdown();
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const clearValue = () => updateItem({ title, value: null });

  return (
    <button className="c-form-dd-value" onClick={clearValue}>
      {value}
    </button>
  );
};

const ClickBar = () => {
  const { title, setWidth } = useDropdown();
  const { isActive, value } = Form.useStoreState(({ getItem }) =>
    getItem(title)
  );
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const toggleActivate = () => updateItem({ isActive: !isActive, title });

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const width = ref?.current?.offsetWidth;
  useEffect(() => setWidth(width), [width]);

  return (
    <div
      ref={ref}
      className="c-form-input c-form-dd-bar"
      onClick={toggleActivate}
    >
      <div>{value && <Value value={value} />}</div>
      <div className="c-form-dd-arrow" />
    </div>
  );
};

export default ({ options, title }: FormItemData) => {
  const { isActive } = Form.useStoreState(({ getItem }) => getItem(title));

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const inactivate = () => updateItem({ isActive: false, title });

  useOnClickOutside(ref, () => isActive && inactivate());

  return (
    <DropdownProvider options={options} title={title}>
      <div ref={ref}>
        <ClickBar />
        {isActive && <OptionContainer />}
      </div>
    </DropdownProvider>
  );
};
