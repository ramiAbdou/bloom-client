/**
 * @fileoverview State: LongText
 * @author Rami Abdou
 */

import React, { useContext, useEffect, useState } from 'react';

import { useForm } from '@components/Form/Form.state';
import { useFormItem } from '../FormItem/FormItem.state';

/* 
  _____                                 _   ___ _        _       
 |_   _|  _ _ __  ___ ___  __ _ _ _  __| | / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-< / _` | ' \/ _` | \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ \__,_|_||_\__,_| |___/\__\__,_|\__\___|
       |__/|_|                                                   
*/

type LongTextInformation = { maxCharacters?: number; text: string };

interface LongTextState extends LongTextInformation {
  hasValueChanged: boolean;
  initializeValue: (value: string) => void;
  setMaxCharacters: (value: number) => void;
  updateText: (value: string) => void;
}

const initialState: LongTextState = {
  hasValueChanged: false,
  initializeValue: () => {},
  maxCharacters: 80,
  setMaxCharacters: () => {},
  text: '',
  updateText: () => {}
};

/* 
   ___         _           _       __  _  _          _   
  / __|___ _ _| |_ _____ _| |_    / / | || |___  ___| |__
 | (__/ _ \ ' \  _/ -_) \ /  _|  / /  | __ / _ \/ _ \ / /
  \___\___/_||_\__\___/_\_\\__| /_/   |_||_\___/\___/_\_\
*/

const LongTextContext = React.createContext(initialState);
export const useLongText = () => useContext(LongTextContext);

/* 
   ___             _    _         
  | _ \_ _ _____ _(_)__| |___ _ _ 
  |  _/ '_/ _ \ V / / _` / -_) '_|
  |_| |_| \___/\_/|_\__,_\___|_|  
*/

export const LongTextProvider = ({ children }) => {
  const [lastSavedValue, setLastSavedValue] = useState('');
  const [maxCharacters, setMaxCharacters] = useState(240);
  const [text, setText] = useState('');

  const { setValue } = useForm();
  const { id } = useFormItem();

  // When the text changes in the input, we should update the value in the
  // parents Form's map of values.
  useEffect(() => {
    if (id) setValue(id, text);
  }, [id, text]);

  const updateText = (value: string) => {
    // If there's no value, set to empty string.
    if (!value) setText('');
    // If the max characters are specfied and the value is longer than that,
    // don't allow the user to type any more characters.
    else if (maxCharacters && value.length > maxCharacters) return;
    setText(value);
  };

  const initializeValue = (value: string) => {
    setLastSavedValue(value);
    updateText(value);
  };

  return (
    <LongTextContext.Provider
      value={{
        hasValueChanged: lastSavedValue !== text,
        initializeValue,
        maxCharacters,
        setMaxCharacters,
        text,
        updateText
      }}
    >
      {children}
    </LongTextContext.Provider>
  );
};
