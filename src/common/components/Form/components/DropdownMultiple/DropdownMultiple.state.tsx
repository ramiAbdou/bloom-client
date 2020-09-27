/**
 * @fileoverview State: DropdownMultiple
 * @author Rami Abdou
 */

import React, { useContext, useEffect, useState } from 'react';

import { filterOptions } from '@util/util';

/* 
  _____                                 _   ___ _        _       
 |_   _|  _ _ __  ___ ___  __ _ _ _  __| | / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-< / _` | ' \/ _` | \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ \__,_|_||_\__,_| |___/\__\__,_|\__\___|
       |__/|_|                                                   
*/

export type DropdownMultipleOption = { value: string; isSelected: boolean };

type DropdownMultipleInformation = {
  options: DropdownMultipleOption[];
  searchString?: string;
};

interface DropdownMultipleState extends DropdownMultipleInformation {
  filteredOptions: DropdownMultipleOption[];
  getSelectedOptions: () => string[];
  initializeValues: (options: DropdownMultipleOption[]) => void;
  setOptions: (options: DropdownMultipleOption[]) => void;
  updateSearchString: (value: string) => void;
  toggleOption: (option: string) => void;
}

const initialState: DropdownMultipleState = {
  filteredOptions: [],
  getSelectedOptions: () => [],
  initializeValues: () => {},
  options: [],
  searchString: '',
  setOptions: () => {},
  toggleOption: () => {},
  updateSearchString: () => {}
};

/* 
   ___         _           _       __  _  _          _   
  / __|___ _ _| |_ _____ _| |_    / / | || |___  ___| |__
 | (__/ _ \ ' \  _/ -_) \ /  _|  / /  | __ / _ \/ _ \ / /
  \___\___/_||_\__\___/_\_\\__| /_/   |_||_\___/\___/_\_\
*/

const DropdownMultipleContext = React.createContext(initialState);

export const useDropdownMultiple = () => useContext(DropdownMultipleContext);

/* 
 ___             _    _         
| _ \_ _ _____ _(_)__| |___ _ _ 
|  _/ '_/ _ \ V / / _` / -_) '_|
|_| |_| \___/\_/|_\__,_\___|_|  
*/

export const DropdownMultipleProvider = ({ children }) => {
  const [filteredOptions, setFilteredOptions] = useState<
    DropdownMultipleOption[]
  >([]);
  const [options, setOptions] = useState<DropdownMultipleOption[]>([]);
  const [searchString, setSearchString] = useState('');

  // When the options get updated for the first time upon loading and whenever
  // the search string is updated, we should update the filtered options.
  // We want to always ensure that any selected options appear first in the
  // dropdown of options.
  useEffect(() => {
    setFilteredOptions(filterOptions(options, searchString));
  }, [options, searchString]);

  const clearSearchString = () => setSearchString('');

  /**
   * Returns a list of the selected options (just the name of the option).
   */
  const getSelectedOptions = (): string[] =>
    options
      .filter(({ isSelected }: DropdownMultipleOption) => isSelected)
      .map(({ value }: DropdownMultipleOption) => value);

  const initializeValues = (allOptions: DropdownMultipleOption[]) => {
    setOptions(allOptions);
  };

  /**
   * To toggle an option we return a mapped array that sets the isSelected value
   * of the option to be the negation of the current value for it.
   */
  const toggleOption = (option: string) => {
    const result = options.map((item: DropdownMultipleOption) => {
      const { value, isSelected } = item;
      if (option !== value) return item;
      return { isSelected: !isSelected, value };
    });

    clearSearchString();
    setOptions(result); // We update all the options with the new results.
  };

  /**
   * Precondition: This can only be called when the search string is empty and
   * the user presses a backspace.
   */
  const removeLastToggledOption = () => {
    const selectedOptions: string[] = getSelectedOptions();
    const lastSelectedOption = selectedOptions.slice(-1)[0];
    toggleOption(lastSelectedOption);
  };

  /**
   * Updates the search string and has additional data processing since the
   * selected options are also apart of the text, which should not be added
   * twice.
   */
  const updateSearchString = (text: string) => {
    const selectedOptionString = getSelectedOptions().join(', ');

    // If the text is an empty string or there are no selected values yet, just
    // set the search string as empty.
    if (!text.length || !selectedOptionString) {
      setSearchString(text);
      return;
    }

    // This case happens when the search string is empty and the user hits
    // backspace, so we remove the last toggled option.
    if (text === `${selectedOptionString},`) {
      removeLastToggledOption();
      return;
    }

    // Otherwise, we know that there are values and thus we have the ', '
    // characters stored in the input field as specified in the SearchBar
    // component. The user should not be able to delete the selected options
    // from the search bar directly, but rather they should click the check box.
    if (!text.includes(`${selectedOptionString}, `)) return;
    setSearchString(text.replace(`${selectedOptionString}, `, ''));
  };

  return (
    <DropdownMultipleContext.Provider
      value={{
        filteredOptions,
        getSelectedOptions,
        initializeValues,
        options,
        searchString,
        setOptions,
        toggleOption,
        updateSearchString
      }}
    >
      {children}
    </DropdownMultipleContext.Provider>
  );
};
