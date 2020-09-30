/**
 * @fileoverview State: DropdownMultiple
 * @author Rami Abdou
 */

import React, { useContext, useEffect, useState } from 'react';

import { Form } from '@components/Form/Form.state';
import { FormItemData } from '@components/Form/Form.types';
import { FormOption, ProviderProps } from '@constants';
import { filterOptions } from '@util/util';

/* 
  _____                      __  ___ _        _       
 |_   _|  _ _ __  ___ ___   / / / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-<  / /  \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ /_/   |___/\__\__,_|\__\___|
       |__/|_|                                        
*/

type DropdownMultipleState = {
  filteredOptions: FormOption[];
  options: FormOption[];
  searchString: string;
  setSearchString: (value: string) => void;
  setWidth: (value: number) => void;
  title: string;
  width: number;
};

const initialState: DropdownMultipleState = {
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

const DropdownMultipleContext = React.createContext(initialState);
export const useDropdownMultiple = () => useContext(DropdownMultipleContext);

/* 
  ___             _    _         
 | _ \_ _ _____ _(_)__| |___ _ _ 
 |  _/ '_/ _ \ V / / _` / -_) '_|
 |_| |_| \___/\_/|_\__,_\___|_|  
*/

interface DropdownMultipleProviderProps extends ProviderProps, FormItemData {}

export default ({
  children,
  options,
  title
}: DropdownMultipleProviderProps) => {
  const [allOptions] = useState<FormOption[]>(options);
  const [filteredOptions, setFilteredOptions] = useState<FormOption[]>(options);
  const [searchString, setSearchString] = useState('');
  const [width, setWidth] = useState(0);

  const { value } = Form.useStoreState(({ getItem }) => getItem(title));

  useEffect(
    () => setFilteredOptions(filterOptions(allOptions, searchString, value)),
    [searchString, value.length]
  );

  return (
    <DropdownMultipleContext.Provider
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
    </DropdownMultipleContext.Provider>
  );
};
