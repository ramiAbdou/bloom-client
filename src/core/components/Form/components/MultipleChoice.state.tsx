/**
 * @fileoverview State: Dropdown
 * @author Rami Abdou
 */

import React, { useContext, useEffect, useState } from 'react';

import { FormItemData } from '@components/Form/Form.types';
import { ProviderProps } from '@constants';
import { filterOptions } from '@util/util';

/* 
  _____                      __  ___ _        _       
 |_   _|  _ _ __  ___ ___   / / / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-<  / /  \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ /_/   |___/\__\__,_|\__\___|
       |__/|_|                                        
*/

type DropdownState = {
  filteredOptions: string[];
  options: string[];
  searchString: string;
  setSearchString: (value: string) => void;
  setWidth: (value: number) => void;
  title: string;
  width: number;
};

const initialState: DropdownState = {
  filteredOptions: [],
  options: [],
  searchString: '',
  setSearchString: () => {},
  setWidth: () => {},
  title: '',
  width: 0
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

interface DropdownProviderProps extends ProviderProps, FormItemData {}

export default ({ children, options, title }: DropdownProviderProps) => {
  const [allOptions] = useState<string[]>(options);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [searchString, setSearchString] = useState('');
  const [width, setWidth] = useState(0);

  useEffect(() => setFilteredOptions(filterOptions(allOptions, searchString)), [
    searchString
  ]);

  return (
    <DropdownContext.Provider
      value={{
        filteredOptions,
        options,
        searchString,
        setSearchString,
        setWidth,
        title,
        width
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};
