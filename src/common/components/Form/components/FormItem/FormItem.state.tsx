/**
 * @fileoverview State: FormItem
 * @author Rami Abdou
 */

import React, { useContext, useEffect, useState } from 'react';

import { useForm } from '../../Form.state';

/* 
  _____                                 _   ___ _        _       
 |_   _|  _ _ __  ___ ___  __ _ _ _  __| | / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-< / _` | ' \/ _` | \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ \__,_|_||_\__,_| |___/\__\__,_|\__\___|
       |__/|_|                                                   
*/

type FormItemState = {
  activate: () => void;
  isActive: boolean;
  id: string;
  inactivate: () => void;
  setId: (id: string) => void;
};

const initialState: FormItemState = {
  activate: () => {},
  id: '',
  inactivate: () => {},
  isActive: false,
  setId: () => {}
};

/* 
   ___         _           _       __  _  _          _   
  / __|___ _ _| |_ _____ _| |_    / / | || |___  ___| |__
 | (__/ _ \ ' \  _/ -_) \ /  _|  / /  | __ / _ \/ _ \ / /
  \___\___/_||_\__\___/_\_\\__| /_/   |_||_\___/\___/_\_\
*/

const FormItemContext = React.createContext(initialState);
export const useFormItem = () => useContext(FormItemContext);

/* 
   ___             _    _         
  | _ \_ _ _____ _(_)__| |___ _ _ 
  |  _/ '_/ _ \ V / / _` / -_) '_|
  |_| |_| \___/\_/|_\__,_\___|_|  
*/

export default ({ children }) => {
  const [id, setId] = useState('');
  const [isActive, setIsActive] = useState(false);

  const { activeItem, setActiveItem } = useForm();

  useEffect(() => {
    if (activeItem === id && !isActive) setIsActive(true);
    if (activeItem !== id) setIsActive(false);
  }, [activeItem, id]);

  const activate = () => setActiveItem(id);
  const inactivate = () => setActiveItem('');

  return (
    <FormItemContext.Provider
      value={{ activate, id, inactivate, isActive, setId }}
    >
      {children}
    </FormItemContext.Provider>
  );
};
