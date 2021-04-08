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
  memberId: string;
  userId: string;

  // UTILITY

  isAuthenticated: Computed<DbModel, boolean>;
  setActiveEntities: Action<DbModel, SetActiveEntitesArgs>;
}
