/**
 * @fileoverview Store
 * - Global store that manages the entire application's state. The entities
 * object as a normalized database for the React application. Most stores that
 * are defined in this global store are defined in the common components folder
 * (ie: PanelModel, ToastModel).
 */

import { createStore, createTypedHooks } from 'easy-peasy';

import loader, { LoaderModel } from '@organisms/Loader/Loader.store';
import modal from '@organisms/Modal/Modal.store';
import { ModalModel } from '@organisms/Modal/Modal.types';
import nav, { NavModel } from '@organisms/Nav/Nav.store';
import panel from '@organisms/Panel/Panel.store';
import { PanelModel } from '@organisms/Panel/Panel.types';
import toast from '@organisms/Toast/Toast.store';
import { ToastModel } from '@organisms/Toast/Toast.types';
import db from './Db/Db.store';
import { DbModel } from './Db/Db.types';

export type StoreModel = {
  db: DbModel;
  loader: LoaderModel;
  modal: ModalModel;
  nav: NavModel;
  panel: PanelModel;
  toast: ToastModel;
};

export const store = createStore<StoreModel>(
  { db, loader, modal, nav, panel, toast },
  { disableImmer: true }
);

export const {
  useStoreActions,
  useStoreState,
  useStore
} = createTypedHooks<StoreModel>();
