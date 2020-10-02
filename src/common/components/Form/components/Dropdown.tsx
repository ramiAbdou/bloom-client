/**
 * @fileoverview Component: Dropdown
 * - Dropdown option in a form where a user chooses between different values.
 * Can only select 1 option.
 * @author Rami Abdou
 */

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import shortid from 'shortid';
import useOnClickOutside from 'use-onclickoutside';

import { FormOption } from '@constants';
import { Form } from '../Form.state';
import { FormItemData } from '../Form.types';
import Dropdown from './Dropdown.state';

type OptionProps = { selectOption: VoidFunction; option: FormOption };
type ValueProps = { value?: FormOption };

const SearchBar = () => {
  const searchString = Dropdown.useStoreState((store) => store.searchString);
  const setSearchString = Dropdown.useStoreActions(
    (store) => store.setSearchString
  );

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

const Option = ({ selectOption, option: { bgColor, value } }: OptionProps) => (
  <button className="c-form-dd-opt" onClick={selectOption}>
    <p className="c-form-dd-opt__txt" style={{ backgroundColor: bgColor }}>
      {value}
    </p>
  </button>
);

const NoResultsMessage = () => (
  <p className="c-form-dd-no-result">No results found.</p>
);

const AllOptions = () => {
  const filteredOptions = Dropdown.useStoreState(
    (store) => store.filteredOptions
  );
  const title = Dropdown.useStoreState((store) => store.title);
  const setSearchString = Dropdown.useStoreActions(
    (store) => store.setSearchString
  );
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const selectOption = (option: FormOption) => {
    updateItem({ isActive: false, title, value: option });
    setSearchString('');
  };

  return (
    <>
      {filteredOptions.map((option: FormOption) => (
        <Option
          key={shortid()}
          option={option}
          selectOption={() => selectOption(option)}
        />
      ))}
    </>
  );
};

const OptionContainer = () => {
  const filteredOptions = Dropdown.useStoreState(
    (store) => store.filteredOptions
  );
  const width = Dropdown.useStoreState((store) => store.width);
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
  const title = Dropdown.useStoreState((store) => store.title);
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const clearValue = () => updateItem({ title, value: null });

  return (
    <button
      className="c-form-dd-value"
      style={{ backgroundColor: value?.bgColor }}
      onClick={clearValue}
    >
      {value?.value}
    </button>
  );
};

const ClickBar = () => {
  const title = Dropdown.useStoreState((store) => store.title);
  const setWidth = Dropdown.useStoreActions((store) => store.setWidth);
  const { isActive, value } = Form.useStoreState(({ getItem }) =>
    getItem(title)
  );
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const toggleActivate = () => updateItem({ isActive: !isActive, title });

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const width = ref?.current?.offsetWidth;

  useEffect(() => {
    setWidth(width);
  }, [width]);

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
    <Dropdown.Provider initialData={{ options, title }}>
      <div ref={ref}>
        <ClickBar />
        {isActive && <OptionContainer />}
      </div>
    </Dropdown.Provider>
  );
};
