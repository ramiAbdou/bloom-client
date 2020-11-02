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
  createTypedHooks,
  persist
} from 'easy-peasy';
import merge from 'lodash/merge';
import { Schema } from 'normalizr';

import { parseEntities } from '@util/util';
import { LoaderModel, loaderModel } from './Loader.store';
import { MembershipModel, membershipModel } from './Membership.store';
import {
  Entity,
  EntityRecord,
  IApplicationQuestion,
  ICommunity,
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
  membership: MembershipModel;
  memberships: Computed<StoreModel, EntityRecord<IMembership>>;
  pendingApplicants: Computed<StoreModel, EntityRecord<IPendingApplicant>>;
  primaryColor: Computed<StoreModel, string>;
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

    community: computed(({ entities }) => {
      const { activeId, byId } = entities.communities;
      return byId[activeId] as ICommunity;
    }),

    entities: {
      applicationQuestions: { allIds: [], byId: {} },
      applications: { allIds: [], byId: {} },
      communities: { allIds: [], byId: {} },
      memberships: { allIds: [], byId: {} },
      pendingApplicants: { allIds: [], byId: {} },
      users: { allIds: [], byId: {} }
    },

    loader: loaderModel,

    membership: persist(membershipModel),

    memberships: computed(
      ({ entities }) => entities.memberships as EntityRecord<IMembership>
    ),

    pendingApplicants: computed(
      ({ entities }) =>
        entities.pendingApplicants as EntityRecord<IPendingApplicant>
    ),

    primaryColor: computed(({ community }) => community?.primaryColor),

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
