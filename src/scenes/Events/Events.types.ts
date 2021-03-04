import Fields from 'gql-query-builder/build/Fields';

export const eventMemberFields: Fields = [
  { member: ['id', 'firstName', 'lastName', 'pictureUrl', { user: ['id'] }] }
];

export const baseEventFields: Fields = [
  ...eventMemberFields,
  'createdAt',
  'id',
  { event: ['id'] }
];

export const eventFields: Fields = [
  ...eventMemberFields,
  'createdAt',
  'email',
  'firstName',
  'id',
  'lastName',
  { event: ['id', 'title'] }
];

export interface CreateEventAttendeeArgs {
  eventId: string;
}

export interface CreateEventGuestArgs {
  email?: string;
  eventId: string;
  firstName?: string;
  lastName?: string;
}

export interface CreateEventWatchArgs {
  eventId: string;
}

export interface DeleteEventGuestArgs {
  eventId: string;
}

export interface EventIdProps {
  eventId: string;
}

export interface GetEventArgs {
  eventId: string;
}
