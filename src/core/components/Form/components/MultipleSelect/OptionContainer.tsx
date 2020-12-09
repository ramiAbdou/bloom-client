import React from 'react';

import Form from '../../Form.store';
import MultipleSelect from './MultipleSelect.store';

const SearchBar = () => {
  const value = MultipleSelect.useStoreState((store) => store.searchString);

  const setSearchString = MultipleSelect.useStoreActions(
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
  const title = MultipleSelect.useStoreState((store) => store.title);
  const value = Form.useStoreState(({ getItem }) => getItem({ title }).value);

  const filteredOptions = MultipleSelect.useStoreState((store) =>
    store.filteredOptions.filter((option: string) => !value?.includes(option))
  );

  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const setSearchString = MultipleSelect.useStoreActions(
    (store) => store.setSearchString
  );

  const closeOptions = MultipleSelect.useStoreActions(
    (store) => store.closeOptions
  );

  const selectOption = (option: string) => {
    const wasNonePreviouslySelected = value.some((element: string) =>
      ['None', 'None of the Above', 'N/A'].includes(element)
    );

    const isOptionNone = ['None', 'None of the Above', 'N/A'].includes(option);

    const result: string[] =
      wasNonePreviouslySelected || isOptionNone ? [option] : [...value, option];

    updateItem({ title, value: result });
    setSearchString('');

    const updatedOptions = filteredOptions.filter(
      (opt: string) => !result.includes(opt)
    );

    if (
      isOptionNone ||
      !updatedOptions.length ||
      (updatedOptions.length === 1 &&
        ['None', 'None of the Above', 'N/A'].includes(updatedOptions[0]))
    ) {
      closeOptions();
    }
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
  const width = MultipleSelect.useStoreState((store) => store.width);

  const noOptionsFound = MultipleSelect.useStoreState(
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
