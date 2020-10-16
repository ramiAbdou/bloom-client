/**
 * @fileoverview Store: Community
 * - Controls the logic for the active community.
 * @author Rami Abdou
 */

import { Action, action } from 'easy-peasy';
import Cookie from 'js-cookie';

import { Form } from '@constants';
import { UserModel } from './UserStore';

export type Community = {
  application: Form;
  encodedUrlName: string;
  id: string;
  name: string;
};

export type CommunityModel = {
  application: Form;
  encodedUrlName: string;
  id: string;
  init: Action<UserModel, Community>;
  name: string;
};

export const communityModel: CommunityModel = {
  application: null,
  encodedUrlName: '',
  id: '',
  init: action((state, { application, encodedUrlName, id, name }) => {
    if (id) Cookie.set('communityId', id);
    return { ...state, application, encodedUrlName, id, name };
  }),
  name: ''
};
