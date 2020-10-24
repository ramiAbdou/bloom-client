/**
 * @fileoverview State: Login
 * @author Rami Abdou
 */

import React, { useContext, useState } from 'react';

import { ProviderProps } from '@constants';

type LoginState = {
  email: string;
  hasLoginLinkSent: boolean;
  setEmail: (email: string) => void;
  setHasLoginLinkSent: (hasLoginLinkSent: boolean) => void;
};

const initialState: LoginState = {
  email: '',
  hasLoginLinkSent: false,
  setEmail: () => {},
  setHasLoginLinkSent: () => {}
};

const LoginContext = React.createContext(initialState);
export const useLogin = () => useContext(LoginContext);

export default ({ children }: ProviderProps) => {
  const [email, setEmail] = useState('');
  const [hasLoginLinkSent, setHasLoginLinkSent] = useState(false);

  return (
    <LoginContext.Provider
      value={{ email, hasLoginLinkSent, setEmail, setHasLoginLinkSent }}
    >
      {children}
    </LoginContext.Provider>
  );
};
