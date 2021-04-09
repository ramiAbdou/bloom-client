// import {
//   IApplication,
//   ICommunity,
//   ICommunityIntegrations,
//   IEvent,
//   IEventAttendee,
//   IEventGuest,
//   IEventWatch,
//   IMember,
//   IMemberIntegrations,
//   IMemberSocials,
//   IMemberType,
//   IMemberValue,
//   IPayment,
//   IQuestion,
//   IRankedQuestion,
//   ISupporter,
//   IUser
// } from '@db/db.entities';
// import GQLUtility from './GQLUtility';

export interface CustomQueryArgs {
  fields: string[];
  queryName: string;
  skip?: boolean;
}

export interface FindOneArgs<T> {
  fields?: (keyof T | string)[];
  skip?: boolean;
  where: Record<string, unknown>;
}

export interface QueryResult<T = unknown> {
  data: T;
  error: string;
  loading: boolean;
}

export type QueryOperator = '_eq' | '_lt' | '_gt';

export interface GQL {
  applications: any;
  communities: any;
  communityIntegrations: any;
  eventAttendees: any;
  eventGuests: any;
  eventWatches: any;
  events: any;
  memberIntegrations: any;
  memberSocials: any;
  memberTypes: any;
  memberValues: any;
  members: any;
  payments: any;
  questions: any;
  rankedQuestions: any;
  supporters: any;
  users: any;
  // applications: GQLUtility<IApplication>;
  // communities: GQLUtility<ICommunity>;
  // communityIntegrations: GQLUtility<ICommunityIntegrations>;
  // eventAttendees: GQLUtility<IEventAttendee>;
  // eventGuests: GQLUtility<IEventGuest>;
  // eventWatches: GQLUtility<IEventWatch>;
  // events: GQLUtility<IEvent>;
  // memberIntegrations: GQLUtility<IMemberIntegrations>;
  // memberSocials: GQLUtility<IMemberSocials>;
  // memberTypes: GQLUtility<IMemberType>;
  // memberValues: GQLUtility<IMemberValue>;
  // members: GQLUtility<IMember>;
  // payments: GQLUtility<IPayment>;
  // questions: GQLUtility<IQuestion>;
  // rankedQuestions: GQLUtility<IRankedQuestion>;
  // supporters: GQLUtility<ISupporter>;
  // users: GQLUtility<IUser>;
}
