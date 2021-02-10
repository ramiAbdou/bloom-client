import { Action, Computed } from 'easy-peasy';
import { Schema } from 'normalizr';

import {
  ICommunity,
  ICommunityApplication,
  IEntities,
  IEvent,
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IIntegrations,
  IMember,
  IMemberData,
  IMemberPayment,
  IMemberType,
  IQuestion,
  IUser
} from './entities';

export interface AddEntitiesArgs {
  entities: IMember[];
  table: keyof IEntities;
}

export type DeleteEntitiesRef = {
  id: string;
  column: string;
  table: keyof IEntities;
};

export interface DeleteEntitiesArgs {
  ids: string[];
  refs?: DeleteEntitiesRef[];
  table: keyof IEntities;
}

export interface MergeEntitiesArgs {
  data?: any;
  schema?: Schema;
}

export interface SetActiveArgs {
  id: string;
  table: keyof IEntities;
}

export type DbModel = {
  byApplicationId: Computed<DbModel, Record<string, ICommunityApplication>>;
  byAttendeeId: Computed<DbModel, Record<string, IEventAttendee>>;
  byCommunityId: Computed<DbModel, Record<string, ICommunity>>;
  byDataId: Computed<DbModel, Record<string, IMemberData>>;
  byEventId: Computed<DbModel, Record<string, IEvent>>;
  byGuestId: Computed<DbModel, Record<string, IEventGuest>>;
  byIntegrationsId: Computed<DbModel, Record<string, IIntegrations>>;
  byMemberId: Computed<DbModel, Record<string, IMember>>;
  byPaymentId: Computed<DbModel, Record<string, IMemberPayment>>;
  byQuestionId: Computed<DbModel, Record<string, IQuestion>>;
  byTypeId: Computed<DbModel, Record<string, IMemberType>>;
  byUserId: Computed<DbModel, Record<string, IUser>>;
  byWatchId: Computed<DbModel, Record<string, IEventWatch>>;

  addEntities: Action<DbModel, AddEntitiesArgs>;
  application: Computed<DbModel, ICommunityApplication>;
  clearEntities: Action<DbModel>;
  community: Computed<DbModel, ICommunity>;
  deleteEntities: Action<DbModel, DeleteEntitiesArgs>;
  entities: IEntities;
  event: Computed<DbModel, IEvent>;
  isAuthenticated: boolean;
  integrations: Computed<DbModel, IIntegrations>;
  member: Computed<DbModel, IMember>;
  mergeEntities: Action<DbModel, MergeEntitiesArgs>;
  setActive: Action<DbModel, SetActiveArgs>;
  setIsAuthenticated: Action<DbModel, boolean>;
  user: Computed<DbModel, IUser>;
};
