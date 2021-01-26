/**
 * @fileoverview Store
 * - Global store that manages the entire application's state. The entities
 * object as a normalized database for the React application. Most stores that
 * are defined in this global store are defined in the common components folder
 * (ie: PanelModel, ToastModel).
 */

import { createStore, createTypedHooks } from 'easy-peasy';

import { ModalModel, modalModel } from '@organisms/Modal/Modal.store';
import { PanelModel, panelModel } from '@organisms/Panel/Panel.store';
import toast, { ToastModel } from '@organisms/Toast/Toast.store';
import { DbModel, dbModel } from './Db.store';

type StoreModel = {
  db: DbModel;
  modal: ModalModel;
  panel: PanelModel;
  toast: ToastModel;
};

export const store = createStore<StoreModel>(
  { db: dbModel, modal: modalModel, panel: panelModel, toast },
  { disableImmer: true }
);

export const {
  useStoreActions,
  useStoreState
} = createTypedHooks<StoreModel>();
