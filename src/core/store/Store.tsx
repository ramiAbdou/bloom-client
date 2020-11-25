/**
 * @fileoverview Store
 * - Global store that manages the entire application's state. The entities
 * object as a normalized database for the React application. Most stores that
 * are defined in this global store are defined in the common components folder
 * (ie: PickerModel, ToastModel).
 * @author Rami Abdou
 */

import {
  Action,
  action,
  Computed,
  computed,
  createStore,
  createTypedHooks
} from 'easy-peasy';
import Cookie from 'js-cookie';
import merge from 'lodash/merge';
import { Schema } from 'normalizr';

import { LoaderModel, loaderModel } from '@components/Loader/Loader.store';
import { ModalModel, modalModel } from '@components/Modal/Modal.store';
import { PickerModel, pickerModel } from '@components/Picker/Picker.store';
import { ToastModel, toastModel } from '@components/Toast/Toast.store';
import { getHueFromRGB, getRGBFromHex, parseEntities } from '@util/util';
import {
  ICommunity,
  IEntities,
  IIntegrations,
  IMembership,
  initialEntities,
  IUser
} from './entities';
import { ScreenModel, screenModel } from './Screen.store';

type UpdateEntitiesArgs = {
  data?: any;
  updatedState?: Partial<IEntities>;
  schema?: Schema<any>;
};

type StoreModel = {
  clearEntities: Action<StoreModel>;
  community: Computed<StoreModel, ICommunity>;
  entities: IEntities;
  integrations: Computed<StoreModel, IIntegrations>;
  loader: LoaderModel;
  membership: Computed<StoreModel, IMembership>;
  modal: ModalModel;
  picker: PickerModel;
  screen: ScreenModel;
  toast: ToastModel;
  updateCommunity: Action<StoreModel, Partial<ICommunity>>;
  updateEntities: Action<StoreModel, UpdateEntitiesArgs>;
  user: Computed<StoreModel, IUser>;
};

export const store = createStore<StoreModel>(
  {
    clearEntities: action((state) => {
      // Reset the Bloom style guide primary color.
      const { style } = document.documentElement;
      style.setProperty('--primary', '#f58023');
      style.setProperty('--primary-hex', `245, 128, 35`);
      style.setProperty('--primary-hue', `27`);
      style.setProperty('--gray-1', `hsl(27, 5%, 20%)`);
      style.setProperty('--gray-2', `hsl(27, 5%, 31%)`);
      style.setProperty('--gray-3', `hsl(27, 5%, 51%)`);
      style.setProperty('--gray-4', `hsl(27, 5%, 74%)`);
      style.setProperty('--gray-5', `hsl(27, 5%, 88%)`);
      style.setProperty('--gray-6', `hsl(27, 5%, 96%)`);

      return { ...state, entities: initialEntities };
    }),

    community: computed(({ entities }) => {
      const { activeId, byId } = entities.communities;
      const result: ICommunity = byId[activeId];

      if (!result) return null;

      // For every request, we should have a communityId set in the token so
      // we could take advantage of the GQL context and reduce # of args.
      if (Cookie.get('communityId') !== activeId)
        Cookie.set('communityId', activeId);

      const color = result?.primaryColor ?? '#f58023';

      // If the document's primary color is up to date, return early.
      const { style } = document.documentElement;
      if (style.getPropertyValue('--primary') === color) return result;

      const RGB = getRGBFromHex(color);
      const hue = getHueFromRGB(RGB);

      style.setProperty('--primary', color);
      style.setProperty('--primary-hex', `${RGB[0]}, ${RGB[1]}, ${RGB[2]}`);
      style.setProperty('--primary-hue', `${hue}`);
      style.setProperty('--gray-1', `hsl(${hue}, 5%, 20%)`);
      style.setProperty('--gray-2', `hsl(${hue}, 5%, 31%)`);
      style.setProperty('--gray-3', `hsl(${hue}, 5%, 51%)`);
      style.setProperty('--gray-4', `hsl(${hue}, 5%, 74%)`);
      style.setProperty('--gray-5', `hsl(${hue}, 5%, 88%)`);
      style.setProperty('--gray-6', `hsl(${hue}, 5%, 96%)`);

      return result;
    }),

    entities: initialEntities,

    integrations: computed(({ community, entities }) => {
      const { byId } = entities.integrations;
      return byId[community?.integrations];
    }),

    loader: loaderModel,

    membership: computed(({ entities }) => {
      const { activeId, byId } = entities.memberships;
      const result = byId[activeId];

      if (result) {
        const { role } = result;

        // For every request, we should have a communityId set in the token so
        // we could take advantage of the GQL context and reduce # of args.
        if (Cookie.get('role') !== role) Cookie.set('role', role);
      }

      return result;
    }),

    modal: modalModel,

    picker: pickerModel,

    screen: screenModel,

    toast: toastModel,

    updateCommunity: action(
      ({ entities, ...state }, payload: Partial<ICommunity>) => {
        const { communities } = entities;
        const { id } = state.community;

        return {
          ...state,
          entities: {
            ...entities,
            communities: {
              ...communities,
              byId: {
                ...communities.byId,
                [id]: { ...state.community, ...payload }
              }
            }
          }
        };
      }
    ),

    /**
     * Main update function that updates all entities (front-end DB). Uses
     * the lodash deep merge function to make the updates.
     */
    updateEntities: action(
      (state, { data, updatedState, schema }: UpdateEntitiesArgs) => ({
        ...state,
        entities: updatedState
          ? { ...state.entities, ...updatedState }
          : merge({}, state.entities, parseEntities(data, schema))
      })
    ),

    /**
     * There should only be one user queried in the application, and that is
     * the logged-in user.
     */
    user: computed(({ entities }) => {
      const { allIds, byId } = entities.users;
      return byId[allIds[0]] as IUser;
    })
  },
  { disableImmer: true }
);

export const { useStoreActions, useStoreState } = createTypedHooks<
  StoreModel
>();
