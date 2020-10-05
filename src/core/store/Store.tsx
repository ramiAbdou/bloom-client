/**
 * @fileoverview Store: Application
 * @author Rami Abdou
 */

import { createStore, createTypedHooks } from 'easy-peasy';

import { UserModel, userModel } from './UserStore';

interface StoreModel {
  user: UserModel;
}

export const store = createStore({ user: userModel }, { disableImmer: true });
export const { useStoreActions, useStoreState } = createTypedHooks<
  StoreModel
>();
