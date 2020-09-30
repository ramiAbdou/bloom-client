/**
 * @fileoverview Component: Dropdown
 * - Dropdown option in a form where a user chooses between different values.
 * Can only select 1 option.
 * @author Rami Abdou
 */

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { Form } from '@components/Form';
import { FormOption } from '@constants';
import CSSModifier from '@util/CSSModifier';
import { FormItemData } from '../Form.types';

const Option = ({ selectOption, option }) => (
  <button className="c-form-dd-opt" onClick={selectOption}>
    <p
      className="c-form-dd-opt__txt"
      style={{ backgroundColor: option.bgColor }}
    >
      {option.value}
    </p>
  </button>
);

const NoResultsMessage = () => (
  <p className="c-form-dd-no-result">No results found.</p>
);

// -----------------------------------------------------------------------------

type OptionContainerProps = {
  options: FormOption[];
  title: string;
  width?: number;
};

const filterOptions = (
  options: FormOption[],
  searchString: string
): FormOption[] => {
  const lowerCaseSearchString = searchString.toLowerCase();

  return options.reduce((acc: FormOption[], value: FormOption) => {
    return value.value.toLowerCase().startsWith(lowerCaseSearchString)
      ? [...acc, value]
      : acc;
  }, []);
};

const OptionContainer = ({ options, title, width }: OptionContainerProps) => {
  const [allOptions] = useState(options);
  const [searchString, setSearchString] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const inactivate = () => updateItem({ isActive: false, title });

  const noOptionsFound = !filteredOptions.length;

  useEffect(() => setFilteredOptions(filterOptions(allOptions, searchString)), [
    searchString
  ]);

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);

  useOnClickOutside(ref, inactivate);

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        className="c-form-dd-opt-ctr"
        style={{ width: width ?? 0 }}
        transition={{ duration: 0.25 }}
      >
        <input
          className="c-form-dd-search"
          placeholder="Search..."
          type="text"
          value={searchString}
          onChange={({ target }) => setSearchString(target.value)}
        />
        {noOptionsFound && <NoResultsMessage />}
        {!noOptionsFound &&
          filteredOptions.map((option) => (
            <Option
              key={option.value}
              option={option}
              selectOption={() =>
                updateItem({ isActive: false, title, value: option })
              }
            />
          ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default ({ options, title }: FormItemData) => {
  const { isActive, value } = Form.useStoreState(({ getItem }) =>
    getItem(title)
  );

  const ref: React.MutableRefObject<HTMLButtonElement> = useRef(null);

  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const activate = () => updateItem({ isActive: true, title });

  const optionProps = {
    options,
    title,
    width: ref?.current?.offsetWidth
  };

  const { css } = new CSSModifier()
    .class('c-form-input')
    .class('c-form-dd-value');

  return (
    <>
      <button ref={ref} className={css} onClick={activate}>
        <p
          className="c-form-dd-value__txt"
          style={{ backgroundColor: value?.bgColor }}
        >
          {value?.value}
        </p>
      </button>

      {isActive && <OptionContainer {...optionProps} />}
    </>
  );
};
