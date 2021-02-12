import { query } from 'gql-query-builder';

// ## CREATE EVENT ATTENDEE

export interface CreateEventAttendeeArgs {
  eventId: string;
}

// ## CREATE EVENT GUEST

export interface CreateEventGuestArgs {
  email?: string;
  eventId: string;
  firstName?: string;
  lastName?: string;
}

// ## DELETE EVENT GUEST

export interface DeleteEventGuestArgs {
  eventId: string;
}

// ## GET EVENT

export interface GetEventArgs {
  eventId: string;
}

export const GET_EVENT = query({
  fields: [
    'description',
    'endTime',
    'eventUrl',
    'id',
    'imageUrl',
    'private',
    'recordingUrl',
    'startTime',
    'summary',
    'title',
    'videoUrl',
    {
      community: [
        'id',
        'name',
        'primaryColor',
        { owner: ['id', { user: ['id', 'email', 'firstName', 'lastName'] }] }
      ]
    }
  ],
  operation: 'getEvent',
  variables: { eventId: { required: true } }
}).query;

// ## GET EVENT ATTENDEES

export const GET_EVENT_ATTENDEES = query({
  fields: [
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
  ],
  operation: 'getEventAttendees',
  variables: { eventId: { required: false }, memberId: { required: false } }
}).query;

// ## GET EVENT GUESTS

export const GET_EVENT_GUESTS = query({
  fields: [
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
  ],
  operation: 'getEventGuests',
  variables: { eventId: { required: false }, memberId: { required: false } }
}).query;

// ## GET EVENT WATCHES

export const GET_EVENT_WATCHES = query({
  fields: [
    'createdAt',
    'id',
    { event: ['id', 'title'] },
    {
      member: [
        'id',
        { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
      ]
    }
  ],
  operation: 'getEventWatches',
  variables: { eventId: { required: false }, memberId: { required: false } }
}).query;

// ## GET PAST EVENTS

export const GET_PAST_EVENTS = query({
  fields: [
    'description',
    'endTime',
    'eventUrl',
    'id',
    'imageUrl',
    'private',
    'recordingUrl',
    'startTime',
    'summary',
    'title',
    'videoUrl',
    { community: ['id'] }
  ],
  operation: 'getPastEvents'
}).query;

// ## GET UPCOMING EVENTS

export const GET_UPCOMING_EVENTS = query({
  fields: [
    'description',
    'endTime',
    'eventUrl',
    'id',
    'imageUrl',
    'private',
    'recordingUrl',
    'startTime',
    'summary',
    'title',
    'videoUrl',
    { community: ['id'] }
  ],
  operation: 'getUpcomingEvents'
}).query;

// ## GET UPCOMING EVENT GUESTS

export const GET_UPCOMING_EVENT_GUESTS = query({
  fields: [
    'createdAt',
    'email',
    'firstName',
    'id',
    'lastName',
    { event: ['id'] },
    {
      member: [
        'id',
        { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
      ]
    }
  ],
  operation: 'getUpcomingEventGuests'
}).query;
