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

// ## CREATE EVENT WATCH

export interface CreateEventWatchArgs {
  eventId: string;
}

export const CREATE_EVENT_WATCH = mutation({
  fields: [
    'createdAt',
    'id',
    { event: ['id'] },
    { member: ['id', { user: ['id', 'firstName', 'lastName', 'pictureUrl'] }] }
  ],
  operation: 'createEventWatch',
  variables: { eventId: { required: true } }
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
    { event: ['id'] },
    {
      member: [
        'id',
        { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
      ]
    }
  ],
  operation: 'getEventAttendees',
  variables: { eventId: { required: true } }
}).query;

// ## GET EVENT GUESTS

export const GET_EVENT_GUESTS = query({
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
  operation: 'getEventGuests',
  variables: { eventId: { required: true } }
}).query;

// ## GET EVENT WATCHES

export const GET_EVENT_WATCHES = query({
  fields: [
    'createdAt',
    'id',
    { event: ['id'] },
    {
      member: [
        'id',
        { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
      ]
    }
  ],
  operation: 'getEventWatches',
  variables: { eventId: { required: true } }
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
        'createdAt',
        'email',
        'firstName',
        'id',
        'lastName',
        {
          member: [
            'id',
            { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
          ]
        }
      ]
    }
  ],
  operation: 'getPastEvents'
}).query;

// ## GET PAST EVENTS

export const GET_PAST_EVENTS_WITH_GUESTS = query({
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
    // {
    //   attendees: [
    //     'email',
    //     'firstName',
    //     'id',
    //     'lastName',
    //     {
    //       member: [
    //         'id',
    //         { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
    //       ]
    //     }
    //   ]
    // },
    // { guests: ['id'] },
    // { watches: ['id'] }
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
