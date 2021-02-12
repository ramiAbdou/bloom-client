import Fields from 'gql-query-builder/build/Fields';

export const baseEventFields: Fields = [
  'createdAt',
  'id',
  { event: ['id'] },
  {
    member: [
      'id',
      { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
    ]
  }
];

export const eventFields: Fields = [
  'createdAt',
  'email',
  'firstName',
  'id',
  'lastName',
  { event: ['id', 'title'] },
  {
    member: [
      'id',
      { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
    ]
  }
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
