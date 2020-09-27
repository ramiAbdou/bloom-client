/**
 * @fileoverview State: Loader
 * @author Rami Abdou
 *
 * @todo Implement a boolean operator that says when to stop showing the loader.
 */

import React, { useContext, useState } from 'react';

import Loader from './Loader';

/* 
  _____                                 _   ___ _        _       
 |_   _|  _ _ __  ___ ___  __ _ _ _  __| | / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-< / _` | ' \/ _` | \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ \__,_|_||_\__,_| |___/\__\__,_|\__\___|
       |__/|_|                                                   
*/

type LoaderState = {
  hideLoader: VoidFunction;
  isShowing: boolean;
  showLoader: VoidFunction;
};

const initialState: LoaderState = {
  hideLoader: () => {},
  isShowing: false,
  showLoader: () => {}
};

/* 
   ___         _           _       __  _  _          _   
  / __|___ _ _| |_ _____ _| |_    / / | || |___  ___| |__
 | (__/ _ \ ' \  _/ -_) \ /  _|  / /  | __ / _ \/ _ \ / /
  \___\___/_||_\__\___/_\_\\__| /_/   |_||_\___/\___/_\_\
*/

const LoaderContext = React.createContext(initialState);
export const useLoader = () => useContext(LoaderContext);

/* 
   ___             _    _         
  | _ \_ _ _____ _(_)__| |___ _ _ 
  |  _/ '_/ _ \ V / / _` / -_) '_|
  |_| |_| \___/\_/|_\__,_\___|_|  
*/

export default ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);

  const hideLoader = () => setIsShowing(false);
  const showLoader = () => setIsShowing(true);

  return (
    <LoaderContext.Provider value={{ hideLoader, isShowing, showLoader }}>
      {isShowing && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
};
