/**
 * @fileoverview State: Login
 * @author Rami Abdou
 */

import React, { useContext, useState } from 'react';

import { ProviderProps } from '@constants';

type LoginState = {
  hasLoginLinkSent: boolean;
  setHasLoginLinkSent: (hasLoginLinkSent: boolean) => void;
};

const initialState: LoginState = {
  hasLoginLinkSent: false,
  setHasLoginLinkSent: () => {}
};

const LoginContext = React.createContext(initialState);
export const useLogin = () => useContext(LoginContext);

export default ({ children }: ProviderProps) => {
  const [hasLoginLinkSent, setHasLoginLinkSent] = useState(false);

  return (
    <LoginContext.Provider value={{ hasLoginLinkSent, setHasLoginLinkSent }}>
      {children}
    </LoginContext.Provider>
  );
};
