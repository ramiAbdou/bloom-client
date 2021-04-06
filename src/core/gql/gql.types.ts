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
  IMemberSocials,
  IMemberType,
  IMemberValue,
  IPayment,
  IQuestion,
  IRankedQuestion,
  ISupporter,
  IUser
} from '@db/db.entities';
import GQLUtility from './GQLUtility';

export interface FindOneArgs<T> {
  fields: (keyof T | string)[];
  where: Record<string, unknown>;
}

export interface QueryArgs {
  fields: string[];
  operation: string;
  schema?: Schema;
  where?: Record<string, unknown>;
}

export interface QueryResult<T = unknown> {
  called?: boolean;
  data: T;
  error: string;
  loading: boolean;
}

export type QueryOperator = '_eq' | '_lt' | '_gt';

export interface GQL {
  applications: GQLUtility<IApplication>;
  communities: GQLUtility<ICommunity>;
  communityIntegrations: GQLUtility<ICommunityIntegrations>;
  eventAttendees: GQLUtility<IEventAttendee>;
  eventGuests: GQLUtility<IEventGuest>;
  eventWatches: GQLUtility<IEventWatch>;
  events: GQLUtility<IEvent>;
  memberIntegrations: GQLUtility<IMemberIntegrations>;
  memberSocials: GQLUtility<IMemberSocials>;
  memberTypes: GQLUtility<IMemberType>;
  memberValues: GQLUtility<IMemberValue>;
  members: GQLUtility<IMember>;
  payments: GQLUtility<IPayment>;
  questions: GQLUtility<IQuestion>;
  rankedQuestions: GQLUtility<IRankedQuestion>;
  supporters: GQLUtility<ISupporter>;
  users: GQLUtility<IUser>;
}
