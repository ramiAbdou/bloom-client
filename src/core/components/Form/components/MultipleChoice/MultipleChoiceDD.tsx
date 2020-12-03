/**
 * @fileoverview Component: MultipleChoiceDD
 * - Multiple choice case in which there are at least 5 options present.
 * @author Rami Abdou
 */

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

import Form from '../../Form.store';
import { FormItemData } from '../../Form.types';
import MultipleChoiceDDProvider, {
  useMultipleChoiceDD
} from './MultipleChoiceDD.state';

type OptionProps = { selectOption: VoidFunction; option: string };
type ValueProps = { value?: string };

const SearchBar = () => {
  const { searchString, setSearchString } = useMultipleChoiceDD();

  return (
    <input
      className="c-form-dd-search"
      type="text"
      value={searchString ?? 'Search...'}
      onChange={({ target }) => setSearchString(target.value)}
    />
  );
};

const Option = ({ selectOption, option }: OptionProps) => (
  <button className="c-form-dd-opt" onClick={selectOption}>
    <p>{option}</p>
  </button>
);

const AllOptions = () => {
  const { filteredOptions, setSearchString, title } = useMultipleChoiceDD();
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const selectOption = (option: string) => {
    updateItem({ title, value: option });
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
  const { filteredOptions, width } = useMultipleChoiceDD();
  const noOptionsFound = !filteredOptions.length;

  return (
    <AnimatePresence>
      <motion.div
        className="c-form-dd-opt-ctr"
        style={{ width: width ?? 0 }}
        transition={{ duration: 0.25 }}
      >
        <SearchBar />
        {noOptionsFound && <p>No results found.</p>}
        {!noOptionsFound && <AllOptions />}
      </motion.div>
    </AnimatePresence>
  );
};

const Value = ({ value }: ValueProps) => {
  const { title } = useMultipleChoiceDD();
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const clearValue = () => updateItem({ title, value: null });

  return (
    <button className="c-form-dd-value" onClick={clearValue}>
      {value}
    </button>
  );
};

const ClickBar = () => {
  const { title, setWidth } = useMultipleChoiceDD();
  const { value } = Form.useStoreState(({ getItem }) => getItem({ title }));

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const width = ref?.current?.offsetWidth;
  useEffect(() => setWidth(width), [width]);

  return (
    <div ref={ref} className="c-form-input c-form-dd-bar">
      <div>{value && <Value value={value} />}</div>
      <div className="c-form-dd-arrow" />
    </div>
  );
};

export default ({ options, title }: FormItemData) => {
  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  return (
    <MultipleChoiceDDProvider options={options} title={title}>
      <div ref={ref}>
        <ClickBar />
        {/* {isActive && <OptionContainer />} */}
      </div>
    </MultipleChoiceDDProvider>
  );
};
