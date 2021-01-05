import { Action, action, createContextStore } from 'easy-peasy';

export type LoginError =
  | 'APPLICATION_PENDING'
  | 'APPLICATION_REJECTED'
  | 'USER_NOT_FOUND';

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
