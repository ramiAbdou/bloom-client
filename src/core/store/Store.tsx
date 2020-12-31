/**
 * @fileoverview Store
 * - Global store that manages the entire application's state. The entities
 * object as a normalized database for the React application. Most stores that
 * are defined in this global store are defined in the common components folder
 * (ie: PanelModel, ToastModel).
 */

import { createStore, createTypedHooks } from 'easy-peasy';

import { LoaderModel, loaderModel } from '@components/Loader/Loader.store';
import { ModalModel, modalModel } from '@components/Modal/Modal.store';
import { PanelModel, panelModel } from '@components/Panel/Panel.store';
import { ToastModel, toastModel } from '@components/Toast/Toast.store';
import { DbModel, dbModel } from './Db.store';

type StoreModel = {
  db: DbModel;
  loader: LoaderModel;
  modal: ModalModel;
  panel: PanelModel;
  toast: ToastModel;
};

export const store = createStore<StoreModel>(
  {
    db: dbModel,
    loader: loaderModel,
    modal: modalModel,
    panel: panelModel,
    toast: toastModel
  },
  { disableImmer: true }
);

export const { useStoreActions, useStoreState } = createTypedHooks<
  StoreModel
>();
