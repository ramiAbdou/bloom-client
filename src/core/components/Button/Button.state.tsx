/**
 * @fileoverview State: Button
 * - Controls the loading state of a button if needed.
 * @author Rami Abdou
 */

import React, { useContext, useState } from 'react';

import { ProviderProps } from '@constants';

type ButtonState = {
  hideLoadingButton: VoidFunction;
  isLoading: boolean;
  showLoadingButton: VoidFunction;
};

const initialState: ButtonState = {
  hideLoadingButton: () => {},
  isLoading: false,
  showLoadingButton: () => {}
};

const ButtonContext = React.createContext(initialState);
export const useButton = () => useContext(ButtonContext);

export default ({ children }: ProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const hideLoadingButton = () => setIsLoading(false);
  const showLoadingButton = () => setIsLoading(true);

  return (
    <ButtonContext.Provider
      value={{ hideLoadingButton, isLoading, showLoadingButton }}
    >
      {children}
    </ButtonContext.Provider>
  );
};
