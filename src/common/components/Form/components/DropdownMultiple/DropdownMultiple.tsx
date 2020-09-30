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

import { Form } from '@components/Form';
import { FormOption } from '@constants';
import { FormItemData } from '../../Form.types';
import DropdownMultipleProvider, {
  useDropdownMultiple
} from './DropdownMultiple.state';

type OptionProps = { selectOption: VoidFunction; option: FormOption };
type ValueProps = { values?: FormOption[] };

const SearchBar = () => {
  const { searchString, setSearchString } = useDropdownMultiple();

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
  const { filteredOptions, setSearchString, title } = useDropdownMultiple();
  const { value } = Form.useStoreState(({ getItem }) => getItem(title));
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const selectOption = (option: FormOption) => {
    updateItem({ title, value: [...value, option] });
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
  const { filteredOptions, width } = useDropdownMultiple();
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

const Values = ({ values }: ValueProps) => {
  const { title } = useDropdownMultiple();
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const deleteValue = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation();
    const updatedValues = [...values.slice(0, index), ...values.slice(++index)];
    updateItem({ isActive: true, title, value: updatedValues });
  };

  return (
    <div className="c-form-dd-value-ctr">
      {values.map(({ bgColor, value }: FormOption, i: number) => (
        <button
          className="c-form-dd-value"
          style={{ backgroundColor: bgColor }}
          onClick={(e) => deleteValue(e, i)}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

const ClickBar = () => {
  const { title, setWidth } = useDropdownMultiple();
  const { isActive, value: values } = Form.useStoreState(({ getItem }) =>
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
      <div>{!!values.length && <Values values={values} />}</div>
      <div className="c-form-dd-arrow" />
    </div>
  );
};

export default ({ options, title }: FormItemData) => {
  const { isActive } = Form.useStoreState(({ getItem }) => getItem(title));

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const inactivate = () => updateItem({ isActive: false, title });

  useOnClickOutside(ref, inactivate);

  return (
    <DropdownMultipleProvider options={options} title={title}>
      <div ref={ref}>
        <ClickBar />
        {isActive && <OptionContainer />}
      </div>
    </DropdownMultipleProvider>
  );
};
