import React from 'react';

import Form from '../../Form.store';
import MultipleChoice from './MultipleChoiceDD.store';

const SearchBar = () => {
  const value = MultipleChoice.useStoreState((store) => store.searchString);

  const setSearchString = MultipleChoice.useStoreActions(
    (store) => store.setSearchString
  );

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
  const title = MultipleChoice.useStoreState((store) => store.title);
  const value = Form.useStoreState(({ getItem }) => getItem({ title }).value);

  const filteredOptions = MultipleChoice.useStoreState((store) =>
    store.filteredOptions.filter((option: string) => value !== option)
  );

  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const closeOptions = MultipleChoice.useStoreActions(
    (store) => store.closeOptions
  );

  const setSearchString = MultipleChoice.useStoreActions(
    (store) => store.setSearchString
  );

  const selectOption = (option: string) => {
    updateItem({
      title,
      // If the option is a None value and there are other options present, we
      // should remove them.
      value: option
    });

    setSearchString('');
    closeOptions();
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
  const width = MultipleChoice.useStoreState((store) => store.width);

  const noOptionsFound = MultipleChoice.useStoreState(
    (store) => !store.filteredOptions.length
  );

  return (
    <div className="c-form-dd-opt-ctr" style={{ width: width ?? 0 }}>
      <SearchBar />
      {noOptionsFound && <p>No results found.</p>}
      {!noOptionsFound && <AllOptions />}
    </div>
  );
};
