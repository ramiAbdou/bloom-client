import { Action, Computed } from 'easy-peasy';
import { Schema } from 'normalizr';

import {
  ICommunity,
  ICommunityIntegrations,
  IEvent,
  IEventAttendee,
  IEventGuest,
  IMember,
  IMemberIntegrations,
  IMemberType,
  IMemberValue,
  IPayment,
  IQuestion,
  IRankedQuestion,
  IUser
} from './db.entities';

export interface EntityRecord<T> {
  activeId?: string;
  byId: Record<string, T>;
}

export interface IEntities {
  communities: EntityRecord<ICommunity>;
  communityIntegrations: EntityRecord<ICommunityIntegrations>;
  eventAttendees: EntityRecord<IEventAttendee>;
  eventGuests: EntityRecord<IEventGuest>;
  events: EntityRecord<IEvent>;
  members: EntityRecord<IMember>;
  memberIntegrations: EntityRecord<IMemberIntegrations>;
  memberTypes: EntityRecord<IMemberType>;
  memberValues: EntityRecord<IMemberValue>;
  payments: EntityRecord<IPayment>;
  questions: EntityRecord<IQuestion>;
  rankedQuestions: EntityRecord<IRankedQuestion>;
  users: EntityRecord<IUser>;
}

// Initial state for all of the entity (DB) definitions.
export const initialEntities: IEntities = {
  communities: { activeId: null, byId: {} },
  communityIntegrations: { byId: {} },
  eventAttendees: { byId: {} },
  eventGuests: { byId: {} },
  events: { activeId: null, byId: {} },
  memberIntegrations: { byId: {} },
  memberTypes: { byId: {} },
  memberValues: { byId: {} },
  members: { activeId: null, byId: {} },
  payments: { byId: {} },
  questions: { byId: {} },
  rankedQuestions: { byId: {} },
  users: { activeId: null, byId: {} }
};

export interface MergeEntitiesArgs {
  data?: any;
  schema?: Schema;
}

export interface SetActiveArgs {
  communityId?: string;
  eventId?: string;
  memberId?: string;
  userId?: string;
}

export interface DbModel {
  communityId: string;
  eventId: string;
  memberId: string;
  userId: string;

  // BY ID STORE

  byCommunityId: Computed<DbModel, Record<string, ICommunity>>;
  byCommunityIntegrationsId: Computed<
    DbModel,
    Record<string, ICommunityIntegrations>
  >;
  byEventId: Computed<DbModel, Record<string, IEvent>>;
  byEventAttendeeId: Computed<DbModel, Record<string, IEventAttendee>>;
  byEventGuestId: Computed<DbModel, Record<string, IEventGuest>>;
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
  byUserId: Computed<DbModel, Record<string, IUser>>;

  // ACTIVE STORE

  community: Computed<DbModel, ICommunity>;
  event: Computed<DbModel, IEvent>;

  // UTILITY

  clearEntities: Action<DbModel>;
  entities: IEntities;
  isAuthenticated: Computed<DbModel, boolean>;
  mergeEntities: Action<DbModel, MergeEntitiesArgs>;
  setActiveEntities: Action<DbModel, SetActiveArgs>;
}
