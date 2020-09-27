/**
 * @fileoverview Component: DropdownMultiple
 * - Dropdown option in a form where a user chooses between different values.
 * Can only select 1 option.
 * @author Rami Abdou
 */

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import shortid from 'shortid';

import { addModifier } from '@util/util';
import { DropdownMultipleProps } from '../../Form.types';
import { checkOrange, triangle, triangleOrange } from '../../images';
import FormItem from '../FormItem/FormItem';
import FormItemProvider, { useFormItem } from '../FormItem/FormItem.state';
import {
  DropdownMultipleOption as DropdownMultipleOptionProps,
  DropdownMultipleProvider,
  useDropdownMultiple
} from './DropdownMultiple.state';

/* 
  ___                   _                    ___       _   _             
 |   \ _ _ ___ _ __  __| |_____ __ ___ _    / _ \ _ __| |_(_)___ _ _  ___
 | |) | '_/ _ \ '_ \/ _` / _ \ V  V / ' \  | (_) | '_ \  _| / _ \ ' \(_-<
 |___/|_| \___/ .__/\__,_\___/\_/\_/|_||_|  \___/| .__/\__|_\___/_||_/__/
              |_|                                |_|                     
*/

// We either display an check-mark icon if isSelected true or a styled div if
// it is set to false.
const DropdownMultipleOption = ({
  value,
  isSelected
}: DropdownMultipleOptionProps) => {
  const { toggleOption } = useDropdownMultiple();
  const onClick = () => toggleOption(value);

  return (
    <div className="c-form-dd-opt--multiple">
      <button className="c-form-dd-opt__check-ctr" onClick={onClick}>
        {isSelected && (
          <img
            alt="Check Icon Orange"
            className="c-form-dd-opt__check--active"
            src={checkOrange}
          />
        )}

        {!isSelected && <div className="c-form-dd-opt__check" />}
      </button>

      <p className="c-form-dd-opt__txt">{value}</p>
    </div>
  );
};

const NoResultsMessage = () => (
  <p className="c-form-dd-opt--none">No results found.</p>
);

const DropdownMultipleOptions = ({ width }) => {
  const { filteredOptions } = useDropdownMultiple();
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
          filteredOptions.map(({ value, isSelected }) => (
            <DropdownMultipleOption
              key={shortid()}
              isSelected={isSelected}
              value={value}
            />
          ))}
      </motion.div>
    </AnimatePresence>
  );
};

/* 
  ___                  _      ___           
 / __| ___ __ _ _ _ __| |_   | _ ) __ _ _ _ 
 \__ \/ -_) _` | '_/ _| ' \  | _ \/ _` | '_|
 |___/\___\__,_|_| \__|_||_| |___/\__,_|_|  
*/

// This search bar has editable and non-editable values. The values that are
// selected are non-editable and the search string is editable. The search
// string will also appear to the right of the selected options. The input
// field text stores the selected options and the search string.
const TextBar = () => {
  const {
    getSelectedOptions,
    searchString,
    updateSearchString
  } = useDropdownMultiple();
  const { activate, isActive } = useFormItem();

  // If there are already selected options and the search bar is active, we
  // add a comma to show that the user can input a search string.
  let selectedOptionString = getSelectedOptions().join(', ');
  selectedOptionString += selectedOptionString.length && isActive ? ', ' : '';

  // We use a ref to control the scroll left value of the input element, which
  // we always want to be the max value, so that the search string appears to
  // the right-most place.
  const inputRef: React.MutableRefObject<HTMLInputElement> = useRef(null);

  useEffect(() => {
    // Execute the scroll if the search string or selected options change.
    const element = inputRef.current;
    element.scrollLeft = element.scrollWidth - element.clientWidth;
  }, [searchString, selectedOptionString]);

  const ref: React.MutableRefObject<HTMLButtonElement> = useRef(null);
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
          value={selectedOptionString + searchString}
          onChange={({ target }) => updateSearchString(target.value)}
          onClick={activate}
          onFocus={activate}
        />

        <img alt="Input Triangle" src={isActive ? triangleOrange : triangle} />
      </button>

      {isActive && <DropdownMultipleOptions width={ref.current.offsetWidth} />}
    </>
  );
};

// -----------------------------------------------------------------------------

const DropdownMultipleContent = ({
  initialValues,
  options,
  ...props
}: DropdownMultipleProps) => {
  const {
    getSelectedOptions,
    initializeValues,
    updateSearchString
  } = useDropdownMultiple();

  useEffect(() => {
    // Need to convert all the initialValues to an array of strings so we can
    // do the isSelected check when formatting the options.
    const initialValuesAsNameArray = initialValues.map(({ value }) => value);

    // We add the isSelected field to each of the options.
    const formattedOptions: DropdownMultipleOptionProps[] = options.map(
      ({ value }) => {
        return { isSelected: initialValuesAsNameArray.includes(value), value };
      }
    );

    initializeValues(formattedOptions);
  }, [options, initialValues]);

  const scrollRef: React.MutableRefObject<HTMLDivElement> = useRef(null);

  const selectedOptions = getSelectedOptions();

  return (
    <div>
      <FormItem
        textBar={<TextBar />}
        value={selectedOptions}
        onClickOutside={() => updateSearchString('')}
        {...props}
      />

      <div ref={scrollRef} />
    </div>
  );
};

export default (props: DropdownMultipleProps) => (
  <FormItemProvider>
    <DropdownMultipleProvider>
      <DropdownMultipleContent {...props} />
    </DropdownMultipleProvider>
  </FormItemProvider>
);
