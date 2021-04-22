/**
 * @fileoverview Store
 * - Global store that manages the entire application's state. The entities
 * object as a normalized database for the React application. Most stores that
 * are defined in this global store are defined in the common components folder
 * (ie: PanelModel, ToastModel).
 */

import { createStore, createTypedHooks, Store } from 'easy-peasy';

import modal from '@components/organisms/Modal/Modal.store';
import { ModalModel } from '@components/organisms/Modal/Modal.types';
import panel from '@components/organisms/Panel/Panel.store';
import { PanelModel } from '@components/organisms/Panel/Panel.types';
import toast from '@components/organisms/Toast/Toast.store';
import { ToastModel } from '@components/organisms/Toast/Toast.types';

export interface StoreModel {
  modal: ModalModel;
  panel: PanelModel;
  toast: ToastModel;
}

export const store: Store<StoreModel> = createStore<StoreModel>(
  { modal, panel, toast },
  { disableImmer: true }
);

export const {
  useStoreActions,
  useStoreState,
  useStore
} = createTypedHooks<StoreModel>();
