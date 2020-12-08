/**
 * @fileoverview Store
 * - Global store that manages the entire application's state. The entities
 * object as a normalized database for the React application. Most stores that
 * are defined in this global store are defined in the common components folder
 * (ie: PickerModel, ToastModel).
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
import mergeWith from 'lodash.mergewith';
import { Schema } from 'normalizr';

import { LoaderModel, loaderModel } from '@components/Loader/Loader.store';
import { ModalModel, modalModel } from '@components/Modal/Modal.store';
import { PickerModel, pickerModel } from '@components/Picker/Picker.store';
import { ToastModel, toastModel } from '@components/Toast/Toast.store';
import { parseEntities } from '@util/util';
import {
  ICommunity,
  IEntities,
  IIntegrations,
  IMembership,
  initialEntities,
  IUser
} from './entities';
import { ScreenModel, screenModel } from './Screen.store';

/**
 * Returns a 3-tuple represents the R-G-B colors from a hexadecimal color.
 *
 * @param hex Hexadecimal color.
 * @see https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 */
const getRGBFromHex = (hex: string): number[] =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

/**
 * Returns the hue from an RGB 3-tuple.
 */
const getHueFromRGB = ([r, g, b]: number[]): number => {
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  if (max === min) return 0;

  let hue = (max + min) / 2;
  const diff = max - min;

  if (max === r) hue = (g - b) / diff;
  if (max === g) hue = (b - r) / diff + 2;
  if (max === b) hue = (r - g) / diff + 4;

  hue *= 60;

  return hue < 0 ? hue + 360 : Math.round(hue);
};

type UpdateEntitiesArgs = {
  data?: any;
  schema?: Schema<any>;
  setActiveId?: boolean;
};

type StoreModel = {
  clearEntities: Action<StoreModel>;
  community: Computed<StoreModel, ICommunity>;
  entities: IEntities;
  integrations: Computed<StoreModel, IIntegrations>;
  isOwner: Computed<StoreModel, boolean>;
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
    clearEntities: action((state) => ({ ...state, entities: initialEntities })),

    community: computed(({ entities }) => {
      const { activeId, byId } = entities.communities;
      const result: ICommunity = byId[activeId];

      if (!result) return null;

      // For every request, we should have a communityId set in the token so
      // we could take advantage of the GQL context and reduce # of args.
      if (Cookie.get('communityId') !== activeId) {
        Cookie.set('communityId', activeId);
      }

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

    isOwner: computed(({ membership }) => membership?.role === 'OWNER'),

    loader: loaderModel,

    membership: computed(({ entities }) => {
      const { activeId, byId } = entities.memberships;
      const result = byId[activeId];

      if (result) {
        // For every request, we should have a communityId set in the token so
        // we could take advantage of the GQL context and reduce # of args.
        const { role } = result;
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
      (state, { data, schema, setActiveId }: UpdateEntitiesArgs) => {
        return {
          ...state,
          entities: mergeWith(
            state.entities,
            parseEntities(data, schema, setActiveId),
            // eslint-disable-next-line consistent-return
            (target: any, source: any) => {
              if (Array.isArray(target) && Array.isArray(source)) {
                const updatedSource = source.filter(
                  (value: any) => !target.includes(value)
                );

                return target.concat(updatedSource);
              }

              if (typeof target === 'object' && typeof source === 'object') {
                if (target?.id && source?.id && target.id === source.id) {
                  return { ...target, ...source };
                }
              }
            }
          ) as IEntities
        };
      }
    ),

    /**
     * There should only be one user queried in the application, and that is
     * the logged-in user.
     */
    user: computed(({ entities }) => {
      const { activeId, byId } = entities.users;
      return byId[activeId];
    })
  },
  { disableImmer: true }
);

export const { useStoreActions, useStoreState } = createTypedHooks<
  StoreModel
>();
