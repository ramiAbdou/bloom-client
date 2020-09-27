/**
 * @fileoverview State: Form
 * - Controls all of the Form functionality including click events, submitting
 * capability and more.
 * @author Rami Abdou
 */

import React, { useContext, useState } from 'react';

import { FormItemValue } from './Form.types';

/* 
  _____                                 _   ___ _        _       
 |_   _|  _ _ __  ___ ___  __ _ _ _  __| | / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-< / _` | ' \/ _` | \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ \__,_|_||_\__,_| |___/\__\__,_|\__\___|
       |__/|_|                                                   
*/

type FormMap = Map<string, FormItemValue>;

type FormState = {
  activeItem: string;
  canSubmit: boolean;
  setActiveItem: (id: string) => void;
  setValue: (id: string, value: any) => void;
  submitForm: () => Promise<void>;
  valueOf: (id: string) => any;
};

const initialState: FormState = {
  activeItem: '',
  canSubmit: false,
  setActiveItem: () => {},
  setValue: () => {},
  submitForm: () => Promise.resolve(),
  valueOf: () => ''
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

// category
// errorMessage
// required
// title
// value

export default ({ children }) => {
  const [activeItem, setActiveItem] = useState('');
  const [canSubmit] = useState(false);
  const [map, setMap] = useState<FormMap>(new Map<string, FormItemValue>());

  const setValue = (id: string, value: any) => {
    const {};
    setMap(map.set(id, { value }));
  };

  const submitForm = async (): Promise<void> => {};

  const valueOf = (id: string): FormItemValue => map.get(id);

  return (
    <FormContext.Provider
      value={{
        activeItem,
        canSubmit,
        setActiveItem,
        setValue,
        submitForm,
        valueOf
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
