/**
 * @fileoverview State: Form
 * - Controls all of the Form functionality including click events, submitting
 * capability and more.
 * @author Rami Abdou
 */

import React, { ReactNode, useContext, useEffect, useState } from 'react';

import { FormItemData } from './Form.types';

/* 
  _____                                 _   ___ _        _       
 |_   _|  _ _ __  ___ ___  __ _ _ _  __| | / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-< / _` | ' \/ _` | \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ \__,_|_||_\__,_| |___/\__\__,_|\__\___|
       |__/|_|                                                   
*/

type FormState = {
  activeIndex: number;
  getItem: (title: string) => FormItemData;
  items: FormItemData[];
  isCompleted: boolean;
  setActiveIndex: (title: number) => void;
  updateItem: (title: string, updatedItem: Partial<FormItemData>) => void;
};

const initialState: FormState = {
  activeIndex: -1,
  getItem: () => null,
  isCompleted: false,
  items: [],
  setActiveIndex: () => {},
  updateItem: () => {}
};

/* 
   ___         _           _       __  _  _          _   
  / __|___ _ _| |_ _____ _| |_    / / | || |___  ___| |__
 | (__/ _ \ ' \  _/ -_) \ /  _|  / /  | __ / _ \/ _ \ / /
  \___\___/_||_\__\___/_\_\\__| /_/   |_||_\___/\___/_\_\
*/

const FormContext = React.createContext(initialState);
export const useForm = () => useContext(FormContext);

/* 
   ___             _    _         
  | _ \_ _ _____ _(_)__| |___ _ _ 
  |  _/ '_/ _ \ V / / _` / -_) '_|
  |_| |_| \___/\_/|_\__,_\___|_|  
*/

type FormProviderProps = { children?: ReactNode; initialItems: FormItemData[] };

export default ({ children, initialItems }: FormProviderProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [items, setItems] = useState<FormItemData[]>([]);

  useEffect(() => setItems(initialItems), []);

  const getItem = (title: string) => items.find((item) => item.title === title);

  const updateItem = (title: string, updatedItem: Partial<FormItemData>) => {
    const index = items.findIndex(({ title: key }) => key === title);

    setItems([
      ...items.slice(0, index),
      { ...items[index], ...updatedItem },
      ...items.slice(index + 1, items.length)
    ]);
  };

  // Is complete if every item is either: 1) not required or 2) required and a
  // value exists.
  const isCompleted: boolean =
    items &&
    items.every(
      ({ required, value }: FormItemData) => !required || (required && value)
    );

  return (
    <FormContext.Provider
      value={{
        activeIndex,
        getItem,
        isCompleted,
        items,
        setActiveIndex,
        updateItem
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
