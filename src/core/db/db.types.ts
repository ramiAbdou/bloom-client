import { Action, Computed } from 'easy-peasy';

export interface SetActiveEntitesArgs {
  communityId?: string;
  eventId?: string;
  memberId?: string;
  userId?: string;
}

export interface DbModel {
  communityId: string;
  eventId: string;
  isAuthenticated: Computed<DbModel, boolean>;
  memberId: string;
  setActiveEntities: Action<DbModel, SetActiveEntitesArgs>;
  userId: string;
}
