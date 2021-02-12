import Fields from 'gql-query-builder/build/Fields';

export const eventMemberFields: Fields = [
  { member: ['id', { user: ['id', 'firstName', 'lastName', 'pictureUrl'] }] }
];

export const baseEventFields: Fields = [
  'createdAt',
  'id',
  { event: ['id'] },
  ...eventMemberFields
];

export const eventFields: Fields = [
  'createdAt',
  'email',
  'firstName',
  'id',
  'lastName',
  { event: ['id', 'title'] },
  ...eventMemberFields
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
