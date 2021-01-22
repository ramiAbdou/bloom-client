import { mutation, query } from 'gql-query-builder';

// ## CREATE EVENT GUEST

export interface CreateEventGuestArgs {
  eventId: string;
}

export const CREATE_EVENT_GUEST = mutation({
  fields: ['id', { event: ['id'] }, { member: ['id'] }],
  operation: 'createEventGuest',
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
    'startTime',
    'title',
    'videoUrl',
    { guests: ['id', { member: ['id'] }] }
  ],
  operation: 'getEvent',
  variables: { eventId: { required: true } }
}).query;

// ## GET EVENTS

export const GET_EVENTS = query({
  fields: [
    'id',
    {
      events: [
        'description',
        'endTime',
        'eventUrl',
        'id',
        'imageUrl',
        'private',
        'recordingUrl',
        'startTime',
        'title',
        'videoUrl',
        { guests: ['id'] }
      ]
    }
  ],
  operation: 'getEvents'
}).query;

// ## GET MEMBER UPCOMING EVENTS

export const GET_MEMBER_UPCOMING_EVENTS = query({
  fields: ['id', { event: ['id'] }, { member: ['id'] }],
  operation: 'getMemberUpcomingEvents'
}).query;

// ## UPDATE RECORDING LINK

export const UPDATE_RECORDING_LINK = mutation({
  fields: ['id', 'recordingUrl'],
  operation: 'updateRecordingLink',
  variables: { id: { required: true }, recordingUrl: { required: true } }
}).query;
