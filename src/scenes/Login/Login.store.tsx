import { Action, action, createContextStore } from 'easy-peasy';

export type LoginError =
  | 'APPLICATION_PENDING'
  | 'APPLICATION_REJECTED'
  | 'USER_NOT_FOUND';

/**
 * Returns the login error message based on the cookie.
 */
export const getLoginErrorMessage = (error: LoginError) => {
  if (error === 'USER_NOT_FOUND')
    return `You must apply and be accepted into a commmunity before logging in.`;
  if (error === 'APPLICATION_REJECTED')
    return `You must be accepted into a commmunity before logging in.`;
  if (error === 'APPLICATION_PENDING')
    return `You have pending membership applications. Once they are accepted, you will be able to log in.`;

  return error;
};

export type LoginModel = {
  email: string;
  hasLoginLinkSent: boolean;
  setEmail: Action<LoginModel, string>;
  setHasLoginLinkSent: Action<LoginModel, boolean>;
};

const loginModel: LoginModel = {
  email: '',

  hasLoginLinkSent: false,

  setEmail: action((state, email) => ({ ...state, email })),

  setHasLoginLinkSent: action((state, hasLoginLinkSent) => ({
    ...state,
    hasLoginLinkSent
  }))
};

export default createContextStore<LoginModel>(loginModel, {
  disableImmer: true
});
