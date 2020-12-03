/**
 * @fileoverview State: MultipleChoiceDDState

 */

import React, { useContext, useEffect, useState } from 'react';

import { FormItemData } from '@components/Form/Form.types';
import { ChildrenProps } from '@constants';
import { filterOptions } from '@util/util';

/* 
  _____                      __  ___ _        _       
 |_   _|  _ _ __  ___ ___   / / / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-<  / /  \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ /_/   |___/\__\__,_|\__\___|
       |__/|_|                                        
*/

type MultipleChoiceDDState = {
  filteredOptions: string[];
  options: string[];
  searchString: string;
  setSearchString: (value: string) => void;
  setWidth: (value: number) => void;
  title: string;
  width: number;
};

const initialState: MultipleChoiceDDState = {
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

const MultipleChoiceDDContext = React.createContext(initialState);
export const useMultipleChoiceDD = () => useContext(MultipleChoiceDDContext);

/* 
  ___             _    _         
 | _ \_ _ _____ _(_)__| |___ _ _ 
 |  _/ '_/ _ \ V / / _` / -_) '_|
 |_| |_| \___/\_/|_\__,_\___|_|  
*/

interface DropdownProviderProps extends ChildrenProps, FormItemData {}

export default ({ children, options, title }: DropdownProviderProps) => {
  const [allOptions] = useState<string[]>(options);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [searchString, setSearchString] = useState('');
  const [width, setWidth] = useState(0);

  useEffect(() => setFilteredOptions(filterOptions(allOptions, searchString)), [
    searchString
  ]);

  return (
    <MultipleChoiceDDContext.Provider
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
    </MultipleChoiceDDContext.Provider>
  );
};
