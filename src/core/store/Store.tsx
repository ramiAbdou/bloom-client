/**
 * @fileoverview Store: Application
 * @author Rami Abdou
 */

import { createStore, createTypedHooks, persist } from 'easy-peasy';

import { CommunityModel, communityModel } from './CommunityStore';
import { ToastModel, toastModel } from './ToastStore';
import { UserModel, userModel } from './UserStore';

type StoreModel = {
  community: CommunityModel;
  toast: ToastModel;
  user: UserModel;
};

export const store = createStore<StoreModel>(
  {
    community: persist(communityModel),
    toast: toastModel,
    user: persist(userModel)
  },
  { disableImmer: true }
);

export const { useStoreActions, useStoreState } = createTypedHooks<
  StoreModel
>();
