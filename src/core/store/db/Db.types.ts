import { Action, Computed } from 'easy-peasy';
import { Schema } from 'normalizr';

import {
  IApplication,
  ICommunity,
  ICommunityIntegrations,
  IEntities,
  IEvent,
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember,
  IMemberIntegrations,
  IMemberSocials,
  IMemberType,
  IMemberValue,
  IPayment,
  IQuestion,
  IRankedQuestion,
  ISupporter,
  IUser
} from './Db.entities';

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
  byMemberSocialsId: Computed<DbModel, Record<string, IMemberSocials>>;
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
  memberSocials: Computed<DbModel, IMemberSocials>;
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
