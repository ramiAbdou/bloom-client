/**
 * @fileoverview State: Form
 * - Controls all of the Form functionality including click events, submitting
 * capability and more.
 * @author Rami Abdou
 */

import React, { ReactNode, useContext, useEffect, useState } from 'react';

import { FormItem } from './Form.types';

/* 
  _____                                 _   ___ _        _       
 |_   _|  _ _ __  ___ ___  __ _ _ _  __| | / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-< / _` | ' \/ _` | \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ \__,_|_||_\__,_| |___/\__\__,_|\__\___|
       |__/|_|                                                   
*/

type FormState = {
  items: FormItem[];
  updateItem: (title: string, updatedItem: Partial<FormItem>) => void;
};

const initialState: FormState = { items: [], updateItem: () => {} };

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

type FormProviderProps = { children?: ReactNode; initialItems: FormItem[] };

export default ({ children, initialItems }: FormProviderProps) => {
  const [items, setItems] = useState<FormItem[]>([]);

  useEffect(() => setItems(initialItems), []);

  const updateItem = (title: string, updatedItem: Partial<FormItem>) => {
    const index = items.findIndex(({ title: key }) => key === title);

    setItems([
      ...items.slice(0, index),
      { ...items[index], ...updatedItem },
      ...items.slice(index + 1, items.length)
    ]);
  };

  return (
    <FormContext.Provider value={{ items, updateItem }}>
      {children}
    </FormContext.Provider>
  );
};
