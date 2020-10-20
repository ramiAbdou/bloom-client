/**
 * @fileoverview Store: Application
 * @author Rami Abdou
 */

import { createStore, createTypedHooks, persist } from 'easy-peasy';

import { LoaderModel, loaderModel } from './LoaderStore';
import { MembershipModel, membershipModel } from './MembershipStore';
import { ToastModel, toastModel } from './ToastStore';
import { UserModel, userModel } from './UserStore';

type StoreModel = {
  loader: LoaderModel;
  membership: MembershipModel;
  toast: ToastModel;
  user: UserModel;
};

export const store = createStore<StoreModel>(
  {
    loader: loaderModel,
    membership: persist(membershipModel),
    toast: toastModel,
    user: persist(userModel)
  },
  { disableImmer: true }
);

export const { useStoreActions, useStoreState } = createTypedHooks<
  StoreModel
>();
