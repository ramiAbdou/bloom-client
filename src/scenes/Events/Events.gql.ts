import { mutation, query } from 'gql-query-builder';

// ## CREATE EVENT ATTENDEE

export interface CreateEventAttendeeArgs {
  eventId: string;
}

export const CREATE_EVENT_ATTENDEE = mutation({
  fields: [
    'createdAt',
    'email',
    'firstName',
    'id',
    'lastName',
    { event: ['id'] },
    { member: ['id', { user: ['id', 'firstName', 'lastName', 'pictureUrl'] }] }
  ],
  operation: 'createEventAttendee',
  variables: { eventId: { required: true } }
}).query;

// ## CREATE EVENT GUEST

export interface CreateEventGuestArgs {
  email?: string;
  eventId: string;
  firstName?: string;
  lastName?: string;
}

export const CREATE_EVENT_GUEST = mutation({
  fields: [
    'createdAt',
    'email',
    'firstName',
    'id',
    'lastName',
    { event: ['id'] },
    { member: ['id', { user: ['id', 'firstName', 'lastName', 'pictureUrl'] }] }
  ],
  operation: 'createEventGuest',
  variables: {
    email: { required: false },
    eventId: { required: true },
    firstName: { required: false },
    lastName: { required: false }
  }
}).query;

// ## DELETE EVENT GUEST

export interface DeleteEventGuestArgs {
  eventId: string;
}

export const DELETE_EVENT_GUEST = mutation({
  operation: 'deleteEventGuest',
  variables: { eventId: { required: true } }
}).query;

// ## GET EVENT

export interface GetEventArgs {
  eventId: string;
  populate?: string[];
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
        {
          questions: [
            'category',
            'id',
            'inDirectoryCard',
            'inExpandedDirectoryCard',
            'title',
            'type',
            'version'
          ]
        },
        {
          owner: ['id', { user: ['id', 'email', 'firstName', 'lastName'] }]
        }
      ]
    },
    {
      attendees: [
        'createdAt',
        'id',
        {
          member: [
            'id',
            'bio',
            { data: ['id', 'value', { question: ['id'] }] },
            { type: ['id', 'name'] },
            { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
          ]
        }
      ]
    },
    {
      guests: [
        'createdAt',
        'email',
        'firstName',
        'id',
        'lastName',
        {
          member: [
            'id',
            { data: ['id', 'value', { question: ['id'] }] },
            { type: ['id', 'name'] },
            { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
          ]
        }
      ]
    }
  ],
  operation: 'getEvent',
  variables: {
    eventId: { required: true },
    populate: { required: false, type: '[String!]' }
  }
}).query;

// ## GET EVENT ATTENDEES SERIES

export const GET_EVENT_ATTENDEES_SERIES = query({
  fields: ['id', { attendeesSeries: ['name', 'value'] }],
  operation: 'getEvent',
  variables: {
    eventId: { required: true },
    populate: { required: false, type: '[String!]' }
  }
}).query;

// ## GET EVENT GUESTS SERIES

export const GET_EVENT_GUESTS_SERIES = query({
  fields: ['id', { guestsSeries: ['name', 'value'] }],
  operation: 'getEvent',
  variables: {
    eventId: { required: true },
    populate: { required: false, type: '[String!]' }
  }
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
    { community: ['id'] },
    {
      attendees: [
        'email',
        'firstName',
        'id',
        'lastName',
        {
          member: [
            'id',
            { user: ['id', 'firstName', 'lastName', 'pictureUrl'] }
          ]
        }
      ]
    }
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
    { community: ['id'] },
    {
      guests: [
        'email',
        'firstName',
        'id',
        'lastName',
        {
          member: [
            'id',
            { user: ['id', 'firstName', 'lastName', 'pictureUrl'] }
          ]
        }
      ]
    }
  ],
  operation: 'getUpcomingEvents'
}).query;

// ## UPDATE RECORDING LINK

export const UPDATE_RECORDING_LINK = mutation({
  fields: ['id', 'recordingUrl'],
  operation: 'updateRecordingLink',
  variables: { id: { required: true }, recordingUrl: { required: true } }
}).query;
