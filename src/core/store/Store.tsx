/**
 * @fileoverview Store
 * - Global store that manages the entire application's state. The entities
 * object as a normalized database for the React application. Most stores that
 * are defined in this global store are defined in the common components folder
 * (ie: PanelModel, ToastModel).
 */

import { createStore, createTypedHooks, Store } from 'easy-peasy';

import loader, { LoaderModel } from '@components/organisms/Loader/Loader.store';
import modal from '@components/organisms/Modal/Modal.store';
import { ModalModel } from '@components/organisms/Modal/Modal.types';
import panel from '@components/organisms/Panel/Panel.store';
import { PanelModel } from '@components/organisms/Panel/Panel.types';
import sidebar from '@components/organisms/Sidebar/Sidebar.store';
import { SidebarModel } from '@components/organisms/Sidebar/Sidebar.types';
import toast from '@components/organisms/Toast/Toast.store';
import { ToastModel } from '@components/organisms/Toast/Toast.types';
import db from '../db/db.store';
import { DbModel } from '../db/db.types';

export interface StoreModel {
  db: DbModel;
  loader: LoaderModel;
  modal: ModalModel;
  panel: PanelModel;
  sidebar: SidebarModel;
  toast: ToastModel;
}

export const store: Store<StoreModel> = createStore<StoreModel>(
  { db, loader, modal, panel, sidebar, toast },
  { disableImmer: true }
);

export const {
  useStoreActions,
  useStoreState,
  useStore
} = createTypedHooks<StoreModel>();
