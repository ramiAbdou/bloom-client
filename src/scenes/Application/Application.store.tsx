/**
 * @fileoverview Store: Application
 * @author Rami Abdou
 */

import { Action, action, createContextStore } from 'easy-peasy';

import { Form } from '@constants';

type Community = {
  application: Form;
  autoAccept: boolean;
  encodedUrlName: string;
  logoUrl: string;
  name: string;
};

export type ApplicationModel = {
  community: Community;
  email: string;
  initCommunity: Action<ApplicationModel, Community>;
  setEmail: Action<ApplicationModel, string>;
};

const applicationModel: ApplicationModel = {
  community: null,
  email: '',
  initCommunity: action((state, community) => ({ ...state, community })),
  setEmail: action((state, email) => ({ ...state, email }))
};

export default createContextStore<ApplicationModel>(applicationModel, {
  disableImmer: true
});
