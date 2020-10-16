/**
 * @fileoverview Store: Community
 * - Controls the logic for the active community.
 * @author Rami Abdou
 */

import { Action, action } from 'easy-peasy';
import Cookie from 'js-cookie';

import { UserModel } from './UserStore';

export type Community = {
  encodedUrlName: string;
  id: string;
  name: string;
};

export type CommunityModel = {
  encodedUrlName: string;
  id: string;
  init: Action<UserModel, Community>;
  name: string;
};

export const communityModel: CommunityModel = {
  encodedUrlName: '',
  id: '',
  init: action((state, { encodedUrlName, id, name }) => {
    if (id) Cookie.set('communityId', id);
    return { ...state, encodedUrlName, id, name };
  }),
  name: ''
};
