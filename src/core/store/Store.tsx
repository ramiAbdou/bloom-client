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

import { getHue, parseEntities } from '@util/util';
import { LoaderModel, loaderModel } from './Loader.store';
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
import { ToastModel, toastModel } from './Toast.store';

type UpdateEntitiesArgs = { data: any; schema: Schema<any> };

type StoreModel = {
  applicationQuestions: Computed<
    StoreModel,
    EntityRecord<IApplicationQuestion>
  >;
  communities: Computed<StoreModel, EntityRecord<ICommunity>>;
  community: Computed<StoreModel, ICommunity>;
  entities: Record<Entity, EntityRecord>;
  loader: LoaderModel;
  members: Computed<StoreModel, EntityRecord<IMember>>;
  membership: Computed<StoreModel, IMembership>;
  memberships: Computed<StoreModel, EntityRecord<IMembership>>;
  pendingApplicants: Computed<StoreModel, EntityRecord<IPendingApplicant>>;
  primaryColor: Computed<StoreModel, string>;
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

    communities: computed(
      ({ entities }) => entities.communities as EntityRecord<ICommunity>
    ),

    community: computed(({ communities }) => {
      const { activeId, byId } = communities;
      const result: ICommunity = byId[activeId];

      console.log(communities);
      if (!result) return null;

      // For every request, we should have a communityId set in the token so
      // we could take advantage of the GQL context and reduce # of args.
      if (Cookie.get('communityId') !== activeId)
        Cookie.set('communityId', activeId);

      return result;
    }),

    entities: {
      applicationQuestions: { allIds: [], byId: {} },
      applications: { allIds: [], byId: {} },
      communities: { allIds: [], byId: {} },
      members: { allIds: [], byId: {} },
      memberships: { allIds: [], byId: {} },
      pendingApplicants: { allIds: [], byId: {} },
      users: { allIds: [], byId: {} }
    },

    loader: loaderModel,

    members: computed(
      ({ entities }) => entities.members as EntityRecord<IMember>
    ),

    membership: computed(({ entities, memberships }) => {
      const { activeId, byId } = memberships;
      const result: IMembership = byId[activeId];

      console.log(entities);
      console.log(memberships.allIds);

      if (!result) return null;
      const { role } = result;

      // For every request, we should have a communityId set in the token so
      // we could take advantage of the GQL context and reduce # of args.
      if (Cookie.get('role') !== role) Cookie.set('role', role);

      return result;
    }),

    memberships: computed(({ entities }) => {
      // console.log(entities);
      return entities.memberships as EntityRecord<IMembership>;
    }),

    pendingApplicants: computed(
      ({ entities }) =>
        entities.pendingApplicants as EntityRecord<IPendingApplicant>
    ),

    primaryColor: computed(({ community }) => {
      const color = community?.primaryColor ?? '#f58023';

      // If the document's primary color is up to date, return early.
      const { style } = document.documentElement;
      if (style.getPropertyValue('--primary') === color) return color;

      const hue = getHue(color);

      style.setProperty('--primary', color);
      style.setProperty('--gray-1', `hsl(${hue}, 5%, 20%)`);
      style.setProperty('--gray-2', `hsl(${hue}, 5%, 31%)`);
      style.setProperty('--gray-3', `hsl(${hue}, 5%, 51%)`);
      style.setProperty('--gray-4', `hsl(${hue}, 5%, 74%)`);
      style.setProperty('--gray-5', `hsl(${hue}, 5%, 88%)`);
      style.setProperty('--gray-6', `hsl(${hue}, 5%, 98%)`);

      return color;
    }),

    setActiveCommunity: action((state, communityId: string) => ({
      ...state,
      communities: { ...state.communities, activeId: communityId }
    })),

    toast: toastModel,

    /**
     * Main update function that updates all entities (front-end DB). Uses
     * the lodash deep merge function to make the updates.
     */
    updateEntities: action((state, { data, schema }: UpdateEntitiesArgs) => ({
      ...state,
      entities: merge({}, state.entities, parseEntities(data, schema))
    })),

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
