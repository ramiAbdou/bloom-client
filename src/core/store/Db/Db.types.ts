import { Action, Computed } from 'easy-peasy';
import { Schema } from 'normalizr';

import {
  IApplication,
  ICommunity,
  IEntities,
  IEvent,
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IIntegrations,
  IMember,
  IMemberPlan,
  IMemberSocials,
  IMemberValue,
  IPayment,
  IQuestion,
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

export type DbModel = {
  byApplicationId: Computed<DbModel, Record<string, IApplication>>;
  byAttendeeId: Computed<DbModel, Record<string, IEventAttendee>>;
  byCommunityId: Computed<DbModel, Record<string, ICommunity>>;
  byEventId: Computed<DbModel, Record<string, IEvent>>;
  byGuestId: Computed<DbModel, Record<string, IEventGuest>>;
  byIntegrationsId: Computed<DbModel, Record<string, IIntegrations>>;
  byMemberId: Computed<DbModel, Record<string, IMember>>;
  byMemberPlanId: Computed<DbModel, Record<string, IMemberPlan>>;
  byPaymentId: Computed<DbModel, Record<string, IPayment>>;
  byQuestionId: Computed<DbModel, Record<string, IQuestion>>;
  bySocialsId: Computed<DbModel, Record<string, IMemberSocials>>;
  bySupporterId: Computed<DbModel, Record<string, ISupporter>>;
  byUserId: Computed<DbModel, Record<string, IUser>>;
  byValuesId: Computed<DbModel, Record<string, IMemberValue>>;
  byWatchId: Computed<DbModel, Record<string, IEventWatch>>;

  application: Computed<DbModel, IApplication>;
  community: Computed<DbModel, ICommunity>;
  event: Computed<DbModel, IEvent>;
  integrations: Computed<DbModel, IIntegrations>;
  member: Computed<DbModel, IMember>;
  socials: Computed<DbModel, IMemberSocials>;
  user: Computed<DbModel, IUser>;

  clearEntities: Action<DbModel>;
  entities: IEntities;
  isAuthenticated: Computed<DbModel, boolean>;
  isInitialized: Computed<DbModel, boolean>;
  isMember: Computed<DbModel, boolean>;
  mergeEntities: Action<DbModel, MergeEntitiesArgs>;
  setActive: Action<DbModel, SetActiveArgs | SetActiveArgs[]>;
};
