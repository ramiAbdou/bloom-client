/**
 * @fileoverview Store: Application
 * @author Rami Abdou
 */

import { createStore, createTypedHooks, persist } from 'easy-peasy';

import { LoaderModel, loaderModel } from './Loader.store';
import { MembershipModel, membershipModel } from './Membership.store';
import { ToastModel, toastModel } from './Toast.store';
import { UserModel, userModel } from './User.store';

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
