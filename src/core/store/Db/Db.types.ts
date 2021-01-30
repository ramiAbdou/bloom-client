import { Action, Computed } from 'easy-peasy';
import { Schema } from 'normalizr';

import {
  ICommunity,
  ICommunityApplication,
  IEntities,
  IEvent,
  IIntegrations,
  IMember,
  IUser
} from '@store/Db/entities';

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
  communityReferenceColumn?: string;
  data?: any;
  schema?: Schema;
  setActiveId?: boolean;
}

export type DbModel = {
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
  setActiveCommunity: Action<DbModel, string>;
  setActiveEvent: Action<DbModel, string>;
  setIsAuthenticated: Action<DbModel, boolean>;
  user: Computed<DbModel, IUser>;
};
