/**
 * @fileoverview Store
 * - Global store that manages the entire application's state. The entities
 * object as a normalized database for the React application. Most stores that
 * are defined in this global store are defined in the common components folder
 * (ie: PanelModel, ToastModel).
 */

import { createStore, createTypedHooks, Store } from 'easy-peasy';

import panel from '@components/organisms/Panel/Panel.store';
import { PanelModel } from '@components/organisms/Panel/Panel.types';

export interface StoreModel {
  panel: PanelModel;
}

export const store: Store<StoreModel> = createStore<StoreModel>(
  { panel },
  { disableImmer: true }
);

export const {
  useStoreActions,
  useStoreState,
  useStore
} = createTypedHooks<StoreModel>();
