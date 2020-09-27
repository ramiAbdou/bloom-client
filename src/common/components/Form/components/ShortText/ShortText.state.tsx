/**
 * @fileoverview State: ShortText
 * @author Rami Abdou
 */

import React, { ReactNode, useContext, useState } from 'react';

import { useForm } from '../../Form.state';

/* 
  _____                                 _   ___ _        _       
 |_   _|  _ _ __  ___ ___  __ _ _ _  __| | / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-< / _` | ' \/ _` | \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ \__,_|_||_\__,_| |___/\__\__,_|\__\___|
       |__/|_|                                                   
*/

type ShortTextState = {
  isActive: boolean;
  setIsActive: (flag: boolean) => void;
  text: string;
  updateText: (value: string) => void;
};

const initialState: ShortTextState = {
  isActive: false,
  setIsActive: () => {},
  text: '',
  updateText: () => {}
};

/* 
   ___         _           _       __  _  _          _   
  / __|___ _ _| |_ _____ _| |_    / / | || |___  ___| |__
 | (__/ _ \ ' \  _/ -_) \ /  _|  / /  | __ / _ \/ _ \ / /
  \___\___/_||_\__\___/_\_\\__| /_/   |_||_\___/\___/_\_\
*/

const ShortTextContext = React.createContext(initialState);
export const useShortText = () => useContext(ShortTextContext);

/* 
   ___             _    _         
  | _ \_ _ _____ _(_)__| |___ _ _ 
  |  _/ '_/ _ \ V / / _` / -_) '_|
  |_| |_| \___/\_/|_\__,_\___|_|  
*/

export type ShortTextProviderProps = {
  children?: ReactNode;
  initialValue: string;
  maxCharacters?: number;
  title: string;
  validate?: (value: string) => string;
};

export default ({
  children,
  initialValue,
  maxCharacters,
  title,
  validate
}: ShortTextProviderProps) => {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState(initialValue ?? '');

  const { updateItem } = useForm();

  const updateText = (value: string) => {
    // If there's no value, set to empty string.
    if (!value) setText('');
    // If the max characters are specfied and the value is longer than that,
    // don't allow the user to type any more characters.
    else if (maxCharacters && value.length > maxCharacters) return;

    setText(value);
    const errorMessage = validate ? validate(value) : '';
    updateItem(title, { errorMessage, value });
  };

  return (
    <ShortTextContext.Provider
      value={{ isActive, setIsActive, text, updateText }}
    >
      {children}
    </ShortTextContext.Provider>
  );
};
