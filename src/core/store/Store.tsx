/**
 * @fileoverview Store: Application
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

import { getHueFromRGB, getRGBFromHex, parseEntities } from '@util/util';
import { LoaderModel, loaderModel } from './Loader.store';
import { ModalModel, modalModel } from './Modal.store';
import { PickerModel, pickerModel } from './Picker.store';
import {
  Entity,
  EntityRecord,
  IApplicationQuestion,
  ICommunity,
  IMember,
  IMembership,
  IPendingApplicant,
  IUser
} from './schema';
import { ScreenModel, screenModel } from './Screen.store';
import { ToastModel, toastModel } from './Toast.store';

type UpdateEntitiesArgs = {
  data?: any;
  updatedState?: Partial<Record<Entity, EntityRecord>>;
  schema?: Schema<any>;
};

type StoreModel = {
  applicationQuestions: Computed<
    StoreModel,
    EntityRecord<IApplicationQuestion>
  >;
  clearEntities: Action<StoreModel>;
  communities: Computed<StoreModel, EntityRecord<ICommunity>>;
  community: Computed<StoreModel, ICommunity>;
  entities: Record<Entity, EntityRecord>;
  loader: LoaderModel;
  members: Computed<StoreModel, EntityRecord<IMember>>;
  membership: Computed<StoreModel, IMembership>;
  memberships: Computed<StoreModel, EntityRecord<IMembership>>;
  modal: ModalModel;
  pendingApplicants: Computed<StoreModel, EntityRecord<IPendingApplicant>>;
  picker: PickerModel;
  screen: ScreenModel;
  setActiveCommunity: Action<StoreModel, string>;
  toast: ToastModel;
  updateEntities: Action<StoreModel, UpdateEntitiesArgs>;
  user: Computed<StoreModel, IUser>;
};

export const store = createStore<StoreModel>(
  {
    applicationQuestions: computed(
      ({ entities }) =>
        entities.applicationQuestions as EntityRecord<IApplicationQuestion>
    ),

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

      return {
        ...state,
        entities: {
          applicationQuestions: { activeId: null, allIds: [], byId: {} },
          applications: { activeId: null, allIds: [], byId: {} },
          communities: { activeId: null, allIds: [], byId: {} },
          members: { activeId: null, allIds: [], byId: {} },
          memberships: { activeId: null, allIds: [], byId: {} },
          pendingApplicants: { activeId: null, allIds: [], byId: {} },
          users: { activeId: null, allIds: [], byId: {} }
        }
      };
    }),

    communities: computed(
      ({ entities }) => entities.communities as EntityRecord<ICommunity>
    ),

    community: computed(({ communities }) => {
      const { activeId, byId } = communities;
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

    entities: {
      applicationQuestions: { activeId: null, allIds: [], byId: {} },
      applications: { activeId: null, allIds: [], byId: {} },
      communities: { activeId: null, allIds: [], byId: {} },
      members: { activeId: null, allIds: [], byId: {} },
      memberships: { activeId: null, allIds: [], byId: {} },
      pendingApplicants: { activeId: null, allIds: [], byId: {} },
      users: { activeId: null, allIds: [], byId: {} }
    },

    loader: loaderModel,

    members: computed(
      ({ entities }) => entities.members as EntityRecord<IMember>
    ),

    membership: computed(({ memberships }) => {
      const { activeId, byId } = memberships;
      return byId[activeId];
    }),

    memberships: computed(({ entities }) => {
      const result = entities.memberships as EntityRecord<IMembership>;

      const { activeId, byId } = result;
      const activeMembership: IMembership = byId[activeId];

      if (!activeMembership) return result;
      const { role } = activeMembership;

      // For every request, we should have a communityId set in the token so
      // we could take advantage of the GQL context and reduce # of args.
      if (Cookie.get('role') !== role) Cookie.set('role', role);

      return result;
    }),

    modal: modalModel,

    pendingApplicants: computed(
      ({ entities }) =>
        entities.pendingApplicants as EntityRecord<IPendingApplicant>
    ),

    picker: pickerModel,

    screen: screenModel,

    setActiveCommunity: action((state, communityId: string) => ({
      ...state,
      communities: { ...state.communities, activeId: communityId }
    })),

    toast: toastModel,

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
