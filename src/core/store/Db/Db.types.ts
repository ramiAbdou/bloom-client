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
} from './entities';

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
  byAttendeeId: Computed<DbModel, Record<string, IEventAttendee>>;
  byCommunityId: Computed<DbModel, Record<string, ICommunity>>;
  byCommunityIntegrationsId: Computed<
    DbModel,
    Record<string, ICommunityIntegrations>
  >;
  byEventId: Computed<DbModel, Record<string, IEvent>>;
  byGuestId: Computed<DbModel, Record<string, IEventGuest>>;
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
  bySocialsId: Computed<DbModel, Record<string, IMemberSocials>>;
  bySupporterId: Computed<DbModel, Record<string, ISupporter>>;
  byUserId: Computed<DbModel, Record<string, IUser>>;
  byWatchId: Computed<DbModel, Record<string, IEventWatch>>;

  // ACTIVE STORE

  application: Computed<DbModel, IApplication>;
  community: Computed<DbModel, ICommunity>;
  communityIntegrations: Computed<DbModel, ICommunityIntegrations>;
  event: Computed<DbModel, IEvent>;
  member: Computed<DbModel, IMember>;
  memberIntegrations: Computed<DbModel, IMemberIntegrations>;
  socials: Computed<DbModel, IMemberSocials>;
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
