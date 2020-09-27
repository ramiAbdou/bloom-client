/**
 * @fileoverview Component: Dropdown
 * - Dropdown option in a form where a user chooses between different values.
 * Can only select 1 option.
 * @author Rami Abdou
 */

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { usePrevious } from '@hooks/usePrevious';
import { addModifier } from '@util/util';
import { DropdownOptionProps, DropdownProps } from '../../Form.types';
import { triangle, triangleOrange } from '../../images';
import FormItem from '../FormItem/FormItem';
import FormItemProvider, { useFormItem } from '../FormItem/FormItem.state';
import DropdownProvider, { useDropdown } from './Dropdown.state';

const DropdownOption = ({ value }: DropdownOptionProps) => {
  const { selectOption } = useDropdown();

  return (
    <button className="c-form-dd-opt" onClick={() => selectOption(value)}>
      <p className="c-form-dd-opt__txt">{value}</p>
    </button>
  );
};

const NoResultsMessage = () => (
  <p className="c-form-dd-opt--none">No results found.</p>
);

// Dropdown container that holds all of the options. We animate the container
// when it is initially dropped down.
const DropdownOptions = ({ width }) => {
  const { filteredOptions } = useDropdown();
  const noOptionsFound = !filteredOptions.length;

  return (
    <AnimatePresence>
      <motion.div
        className="c-form-dd-opt-ctr"
        style={{ width: width ?? 0 }}
        transition={{ duration: 0.25 }}
      >
        {noOptionsFound && <NoResultsMessage />}
        {!noOptionsFound &&
          filteredOptions.map((value: string) => (
            <DropdownOption key={value} value={value} />
          ))}
      </motion.div>
    </AnimatePresence>
  );
};

// -----------------------------------------------------------------------------

const TextBar = () => {
  const { searchString, setSearchString } = useDropdown();
  const { activate, isActive } = useFormItem();

  const ref: React.MutableRefObject<HTMLButtonElement> = useRef(null);
  const inputRef: React.MutableRefObject<HTMLInputElement> = useRef(null);
  const className: string = addModifier('c-form-input', isActive);

  return (
    <>
      <button
        ref={ref}
        className={className}
        onFocus={() => inputRef.current.focus()}
      >
        <input
          ref={inputRef}
          className="c-form-input__txt"
          type="text"
          value={searchString}
          onChange={({ target }) => setSearchString(target.value)}
          onClick={activate}
          onFocus={activate}
        />

        <img alt="Input Triangle" src={isActive ? triangleOrange : triangle} />
      </button>

      {isActive && <DropdownOptions width={ref.current.offsetWidth} />}
    </>
  );
};

// -----------------------------------------------------------------------------

const DropdownContent = ({
  options,
  initialValue,
  ...props
}: DropdownProps) => {
  const {
    initializeValue,
    setOptions,
    selectedOption,
    setSearchString
  } = useDropdown();
  const { isActive } = useFormItem();

  // Sets the initial data to be the fetched options and selected option.
  // Note the options and initialValue will only change once (ideally) and
  // so this acts as a component will mount type function.
  useEffect(() => {
    initializeValue(initialValue);
    setOptions(options);
  }, []);

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const scrollRef: React.MutableRefObject<HTMLDivElement> = useRef(null);

  const wasActive: boolean = usePrevious(isActive);
  useOnClickOutside(ref, () => {
    // When the user clicks outside of the element, we set the search string to
    // be the value of the selected option. Reduces user error.
    if (wasActive) setSearchString(selectedOption);
  });

  return (
    <div ref={ref}>
      <FormItem textBar={<TextBar />} value={selectedOption} {...props} />
      <div ref={scrollRef} style={{ marginTop: 12 }} />
    </div>
  );
};

export default (props: DropdownProps) => (
  <FormItemProvider>
    <DropdownProvider>
      <DropdownContent {...props} />
    </DropdownProvider>
  </FormItemProvider>
);
