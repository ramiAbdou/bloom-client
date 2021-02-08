/**
 * @fileoverview Store
 * - Global store that manages the entire application's state. The entities
 * object as a normalized database for the React application. Most stores that
 * are defined in this global store are defined in the common components folder
 * (ie: PanelModel, ToastModel).
 */

import { createStore, createTypedHooks } from 'easy-peasy';

import loader, { LoaderModel } from '@organisms/Loader/Loader.store';
import nav, { NavModel } from '@organisms/Nav/Nav.store';
import { PanelModel, panelModel } from '@organisms/Panel/Panel.store';
import toast, { ToastModel } from '@organisms/Toast/Toast.store';
import db from './Db/Db.store';
import { DbModel } from './Db/Db.types';

export type StoreModel = {
  db: DbModel;
  loader: LoaderModel;
  nav: NavModel;
  panel: PanelModel;
  toast: ToastModel;
};

export const store = createStore<StoreModel>(
  { db, loader, nav, panel: panelModel, toast },
  { disableImmer: true }
);

export const {
  useStoreActions,
  useStoreState,
  useStore
} = createTypedHooks<StoreModel>();
