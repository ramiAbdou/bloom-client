/**
 * @fileoverview State: Dropdown
 * @author Rami Abdou
 */

import React, { useContext, useEffect, useState } from 'react';

import { useForm } from '@components/Form/Form.state';
import { filterOptions } from '@util/util';
import { useFormItem } from '../FormItem/FormItem.state';

/* 
  _____                                 _   ___ _        _       
 |_   _|  _ _ __  ___ ___  __ _ _ _  __| | / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-< / _` | ' \/ _` | \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ \__,_|_||_\__,_| |___/\__\__,_|\__\___|
       |__/|_|                                                   
*/

type DropdownInformation = {
  options: string[]; // All of the available options in the Dropdown component.
  selectedOption: string;
};

interface DropdownState extends DropdownInformation {
  filteredOptions: string[]; // Options that are queried by the search string.
  initializeValue: (option: string) => void;
  searchString: string; // Used to search through all of the Dropdown options.
  setOptions: (options: string[]) => void;
  setSearchString: (value: string) => void;
  selectOption: (option: string) => void;
}

const initialState: DropdownState = {
  filteredOptions: [],
  initializeValue: () => {},
  options: [],
  searchString: '',
  selectOption: () => {},
  selectedOption: '',
  setOptions: () => {},
  setSearchString: () => {}
};

/* 
   ___         _           _       __  _  _          _   
  / __|___ _ _| |_ _____ _| |_    / / | || |___  ___| |__
 | (__/ _ \ ' \  _/ -_) \ /  _|  / /  | __ / _ \/ _ \ / /
  \___\___/_||_\__\___/_\_\\__| /_/   |_||_\___/\___/_\_\
*/

const DropdownContext = React.createContext(initialState);
export const useDropdown = () => useContext(DropdownContext);

/* 
   ___             _    _         
  | _ \_ _ _____ _(_)__| |___ _ _ 
  |  _/ '_/ _ \ V / / _` / -_) '_|
  |_| |_| \___/\_/|_\__,_\___|_|  
*/

export default ({ children }) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const { inactivate, id } = useFormItem();
  const { setValue } = useForm();

  useEffect(() => {
    setFilteredOptions(filterOptions(options, searchString));
  }, [options, searchString]);

  const selectOption = (option: string) => {
    setSelectedOption(option); // Update the selected option.
    setSearchString(option); // Set search string to the selected option.
    setValue(id, selectedOption); // Update the value in the form.
    inactivate(); // Set the form item to no longer be active.
  };

  const initializeValue = (option?: string) => {
    selectOption(option || '');
  };

  return (
    <DropdownContext.Provider
      value={{
        filteredOptions,
        initializeValue,
        options,
        searchString,
        selectOption,
        selectedOption,
        setOptions,
        setSearchString
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};
