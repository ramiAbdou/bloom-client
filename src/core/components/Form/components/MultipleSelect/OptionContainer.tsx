import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import Form from '../../Form.store';
import MultipleSelect from './MultipleSelect.store';

const SearchBar = () => {
  const setSearchString = MultipleSelect.useStoreActions(
    (store) => store.setSearchString
  );

  const value = MultipleSelect.useStoreState((store) => store.searchString);

  return (
    <input
      className="c-form-dd-search"
      placeholder="Search..."
      type="text"
      value={value}
      onChange={({ target }) => setSearchString(target.value)}
    />
  );
};

type OptionProps = { selectOption: VoidFunction; option: string };

const Option = ({ selectOption, option }: OptionProps) => (
  <button className="c-form-dd-opt" onClick={selectOption}>
    <p>{option}</p>
  </button>
);

const AllOptions = () => {
  const title = MultipleSelect.useStoreState((store) => store.title);

  const filteredOptions = MultipleSelect.useStoreState(
    (store) => store.filteredOptions
  );

  const removeOption = MultipleSelect.useStoreActions(
    (store) => store.removeOption
  );

  const value = Form.useStoreState(({ getItem }) => getItem({ title }).value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const setSearchString = MultipleSelect.useStoreActions(
    (store) => store.setSearchString
  );

  const selectOption = (option: string) => {
    const wasNoneSelected = value.some((element: string) =>
      ['None', 'None of the Above', 'N/A'].includes(element)
    );

    const isOptionNone = ['None', 'None of the Above', 'N/A'].includes(option);

    const result: string[] =
      wasNoneSelected || isOptionNone ? [option] : [...value, option];

    updateItem({
      // If we've selected all the values available, don't continue to have the
      // option container open. So we set isActive to false.
      title,
      // If the option is a None value and there are other options present, we
      // should remove them.
      value: result
    });

    removeOption(result);
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

export default () => {
  const isOpen = MultipleSelect.useStoreState((store) => store.isOpen);
  const width = MultipleSelect.useStoreState((store) => store.width);

  const noOptionsFound = MultipleSelect.useStoreState(
    (store) => !store.filteredOptions.length
  );

  console.log(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="c-form-dd-opt-ctr"
          style={{ width: width ?? 0 }}
          transition={{ duration: 0.25 }}
        >
          <SearchBar />
          {noOptionsFound && <p>No results found.</p>}
          {!noOptionsFound && <AllOptions />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
