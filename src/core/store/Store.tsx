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

import { parseEntities } from '@util/util';
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

      // For every request, we should have a communityId set in the token so
      // we could take advantage of the GQL context and reduce # of args.
      if (Cookie.get('communityId') !== activeId)
        Cookie.set('communityId', activeId);

      return byId[activeId] as ICommunity;
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

    memberships: computed(
      ({ entities }) => entities.memberships as EntityRecord<IMembership>
    ),

    pendingApplicants: computed(
      ({ entities }) =>
        entities.pendingApplicants as EntityRecord<IPendingApplicant>
    ),

    primaryColor: computed(({ community }) => community?.primaryColor),

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
