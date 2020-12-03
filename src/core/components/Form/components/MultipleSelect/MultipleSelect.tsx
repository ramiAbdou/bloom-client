/**
 * @fileoverview Component: Dropdown
 * - Dropdown option in a form where a user chooses between different values.
 * Can only select 1 option.
 * @author Rami Abdou
 */

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import Form from '../../Form.store';
import { FormItemData } from '../../Form.types';
import DropdownMultipleProvider, {
  useDropdownMultiple
} from './MultipleSelectState';

type OptionProps = { selectOption: VoidFunction; option: string };
type ValueProps = { values?: string[] };

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

const Option = ({ selectOption, option }: OptionProps) => (
  <button className="c-form-dd-opt" onClick={selectOption}>
    <p>{option}</p>
  </button>
);

const NoResultsMessage = () => (
  <p className="c-form-dd-no-result">No results found.</p>
);

const AllOptions = () => {
  const { filteredOptions, setSearchString, title } = useDropdownMultiple();
  const { value } = Form.useStoreState(({ getItem }) => getItem({ title }));
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const selectOption = (option: string) => {
    const wasNoneSelected = value.some((element: string) =>
      ['None', 'None of the Above', 'N/A'].includes(element)
    );

    const isOptionNone = ['None', 'None of the Above', 'N/A'].includes(option);

    let result: string[];
    if (wasNoneSelected) result = [option];
    else result = isOptionNone ? [option] : [...value, option];

    updateItem({
      // If we've selected all the values available, don't continue to have the
      // option container open. So we set isActive to false.
      title,
      // If the option is a None value and there are other options present, we
      // should remove them.-
      value: result
    });

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
    updateItem({ title, value: updatedValues });
  };

  return (
    <div className="c-form-dd-value-ctr">
      {values.map((option, i: number) => (
        <button
          key={option}
          className="c-form-dd-value"
          onClick={(e) => deleteValue(e, i)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

const ClickBar = () => {
  const { title, setWidth } = useDropdownMultiple();

  const { value: values } = Form.useStoreState(({ getItem }) =>
    getItem({ title })
  );

  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const toggleActivate = () => updateItem({ title });

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
  const [isActive, setIsActive] = useState(false);
  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);

  return (
    <DropdownMultipleProvider options={options} title={title}>
      <div ref={ref} onClick={() => setIsActive(!isActive)}>
        <ClickBar />
        {isActive && <OptionContainer />}
      </div>
    </DropdownMultipleProvider>
  );
};
