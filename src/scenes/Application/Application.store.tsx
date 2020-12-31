import { Action, action, createContextStore } from 'easy-peasy';

export type ApplicationModel = {
  email: string;
  setEmail: Action<ApplicationModel, string>;
};

const model: ApplicationModel = {
  email: '',
  setEmail: action((state, email) => ({ ...state, email }))
};

export default createContextStore<ApplicationModel>(model);
