import { Action, Computed } from 'easy-peasy';
import { Schema } from 'normalizr';

import {
  IApplication,
  ICommunity,
  ICommunityIntegrations,
  IEvent,
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember,
  IMemberIntegrations,
  IMemberType,
  IMemberValue,
  IPayment,
  IQuestion,
  IRankedQuestion,
  ISupporter,
  IUser
} from './db.entities';

export interface EntityRecord<T> {
  activeId?: string;
  byId: Record<string, T>;
}

export interface IEntities {
  applications: EntityRecord<IApplication>;
  communities: EntityRecord<ICommunity>;
  communityIntegrations: EntityRecord<ICommunityIntegrations>;
  eventAttendees: EntityRecord<IEventAttendee>;
  eventGuests: EntityRecord<IEventGuest>;
  eventWatches: EntityRecord<IEventWatch>;
  events: EntityRecord<IEvent>;
  members: EntityRecord<IMember>;
  memberIntegrations: EntityRecord<IMemberIntegrations>;
  memberTypes: EntityRecord<IMemberType>;
  memberValues: EntityRecord<IMemberValue>;
  payments: EntityRecord<IPayment>;
  questions: EntityRecord<IQuestion>;
  rankedQuestions: EntityRecord<IRankedQuestion>;
  supporters: EntityRecord<ISupporter>;
  users: EntityRecord<IUser>;
}

// Initial state for all of the entity (DB) definitions.
export const initialEntities: IEntities = {
  applications: { byId: {} },
  communities: { activeId: null, byId: {} },
  communityIntegrations: { byId: {} },
  eventAttendees: { byId: {} },
  eventGuests: { byId: {} },
  eventWatches: { byId: {} },
  events: { activeId: null, byId: {} },
  memberIntegrations: { byId: {} },
  memberTypes: { byId: {} },
  memberValues: { byId: {} },
  members: { activeId: null, byId: {} },
  payments: { byId: {} },
  questions: { byId: {} },
  rankedQuestions: { byId: {} },
  supporters: { byId: {} },
  users: { activeId: null, byId: {} }
};

export interface MergeEntitiesArgs {
  data?: any;
  schema?: Schema;
}

export interface SetActiveArgs {
  id: string;
  table: keyof IEntities;
}

export interface DbModel {
  // BY ID STORE

  byApplicationId: Computed<DbModel, Record<string, IApplication>>;
  byCommunityId: Computed<DbModel, Record<string, ICommunity>>;
  byCommunityIntegrationsId: Computed<
    DbModel,
    Record<string, ICommunityIntegrations>
  >;
  byEventId: Computed<DbModel, Record<string, IEvent>>;
  byEventAttendeeId: Computed<DbModel, Record<string, IEventAttendee>>;
  byEventGuestId: Computed<DbModel, Record<string, IEventGuest>>;
  byEventWatchId: Computed<DbModel, Record<string, IEventWatch>>;
  byMemberId: Computed<DbModel, Record<string, IMember>>;
  byMemberIntegrationsId: Computed<
    DbModel,
    Record<string, IMemberIntegrations>
  >;
  byMemberTypeId: Computed<DbModel, Record<string, IMemberType>>;
  byMemberValuesId: Computed<DbModel, Record<string, IMemberValue>>;
  byPaymentId: Computed<DbModel, Record<string, IPayment>>;
  byQuestionId: Computed<DbModel, Record<string, IQuestion>>;
  byRankedQuestionId: Computed<DbModel, Record<string, IRankedQuestion>>;
  bySupporterId: Computed<DbModel, Record<string, ISupporter>>;
  byUserId: Computed<DbModel, Record<string, IUser>>;

  // ACTIVE STORE

  application: Computed<DbModel, IApplication>;
  community: Computed<DbModel, ICommunity>;
  communityIntegrations: Computed<DbModel, ICommunityIntegrations>;
  event: Computed<DbModel, IEvent>;
  member: Computed<DbModel, IMember>;
  memberIntegrations: Computed<DbModel, IMemberIntegrations>;
  user: Computed<DbModel, IUser>;

  // UTILITY

  clearEntities: Action<DbModel>;
  entities: IEntities;
  isAuthenticated: Computed<DbModel, boolean>;
  isInitialized: Computed<DbModel, boolean>;
  isMember: Computed<DbModel, boolean>;
  mergeEntities: Action<DbModel, MergeEntitiesArgs>;
  setActiveEntities: Action<DbModel, SetActiveArgs | SetActiveArgs[]>;
}
