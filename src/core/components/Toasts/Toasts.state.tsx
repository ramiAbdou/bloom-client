/**
 * @fileoverview State: Toasts
 * @author Rami Abdou, Matthew Guo
 */

import React, { useContext, useState } from 'react';
import shortid from 'shortid';

/* 
  _____                      __  ___ _        _       
 |_   _|  _ _ __  ___ ___   / / / __| |_ __ _| |_ ___ 
   | || || | '_ \/ -_|_-<  / /  \__ \  _/ _` |  _/ -_)
   |_| \_, | .__/\___/__/ /_/   |___/\__\__,_|\__\___|
       |__/|_|                                        
*/

export const ANIMATION_DURATION = 500;
export type ToastOptions = { icon?: any; message: string };

interface Toast extends ToastOptions {
  id: string; // Helps AnimatePresence know which toast is being added/removed.
}

type ToastState = {
  enqueueToast: (toast: ToastOptions) => void;
  queue: Toast[];
};

const initialState: ToastState = {
  enqueueToast: () => {},
  queue: []
};

/* 
   ___         _           _       __  _  _          _   
  / __|___ _ _| |_ _____ _| |_    / / | || |___  ___| |__
 | (__/ _ \ ' \  _/ -_) \ /  _|  / /  | __ / _ \/ _ \ / /
  \___\___/_||_\__\___/_\_\\__| /_/   |_||_\___/\___/_\_\
*/

const ToastsContext = React.createContext(initialState);
export const useToasts = () => useContext(ToastsContext);

/* 
  ___             _    _         
 | _ \_ _ _____ _(_)__| |___ _ _ 
 |  _/ '_/ _ \ V / / _` / -_) '_|
 |_| |_| \___/\_/|_\__,_\___|_|  
*/

export default ({ children }) => {
  const [queue, setQueue] = useState<Toast[]>([]);

  const dequeueToast = () => setQueue(([, ...end]: Toast[]) => end);

  const enqueueToast = ({ icon, message }: ToastOptions) => {
    const toast: Toast = { icon, id: shortid(), message };
    setQueue((prev: Toast[]) => [...prev, toast]);
    setTimeout(dequeueToast, 2000 + ANIMATION_DURATION);
  };

  return (
    <ToastsContext.Provider
      value={{
        enqueueToast,
        queue
      }}
    >
      {children}
    </ToastsContext.Provider>
  );
};
