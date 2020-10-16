/**
 * @fileoverview Store: Application
 * @author Rami Abdou
 */

import { createStore, createTypedHooks } from 'easy-peasy';

import { CommunityModel, communityModel } from './CommunityStore';
import { UserModel, userModel } from './UserStore';

type StoreModel = { community: CommunityModel; user: UserModel };

export const store = createStore<StoreModel>(
  { community: communityModel, user: userModel },
  { disableImmer: true }
);

export const { useStoreActions, useStoreState } = createTypedHooks<
  StoreModel
>();
