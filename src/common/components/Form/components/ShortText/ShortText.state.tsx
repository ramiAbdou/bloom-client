/**
 * @fileoverview State: ShortText
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

type ShortTextState = {
  maxCharacters?: number;
  setMaxCharacters: (value: number) => void;
  text: string;
  updateText: (value: string) => void;
};

const initialState: ShortTextState = {
  maxCharacters: null,
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

const ShortTextContext = React.createContext(initialState);
export const useShortText = () => useContext(ShortTextContext);

/* 
   ___             _    _         
  | _ \_ _ _____ _(_)__| |___ _ _ 
  |  _/ '_/ _ \ V / / _` / -_) '_|
  |_| |_| \___/\_/|_\__,_\___|_|  
*/

export default ({ children }) => {
  const [maxCharacters, setMaxCharacters] = useState(null);
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

  return (
    <ShortTextContext.Provider
      value={{
        maxCharacters,
        setMaxCharacters,
        text,
        updateText
      }}
    >
      {children}
    </ShortTextContext.Provider>
  );
};
