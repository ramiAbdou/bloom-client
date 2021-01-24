import { mutation, query } from 'gql-query-builder';

// ## CREATE EVENT ATTENDEE

export interface CreateEventAttendeeArgs {
  eventId: string;
}

export const CREATE_EVENT_ATTENDEE = mutation({
  fields: ['id', { event: ['id'] }, { member: ['id'] }],
  operation: 'createEventAttendee',
  variables: { eventId: { required: true } }
}).query;

// ## CREATE EVENT GUEST

export interface CreateEventGuestArgs {
  eventId: string;
}

export const CREATE_EVENT_GUEST = mutation({
  fields: [
    'id',
    { event: ['id'] },
    { member: ['id', { user: ['id', 'firstName', 'lastName', 'pictureUrl'] }] }
  ],
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
    'recordingUrl',
    'startTime',
    'summary',
    'title',
    'videoUrl',
    {
      community: [
        'id',
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
        }
      ]
    },
    {
      guests: [
        'createdAt',
        'id',
        {
          member: [
            'id',
            { data: ['id', 'value', { question: ['id'] }] },
            { type: ['id', 'name'] },
            { user: ['id', 'firstName', 'lastName', 'pictureUrl'] }
          ]
        }
      ]
    }
  ],
  operation: 'getEvent',
  variables: { eventId: { required: true } }
}).query;

// ## GET EVENT GUEST SERIES

export const GET_EVENT_GUEST_SERIES = query({
  fields: ['name', 'value'],
  operation: 'getEventGuestSeries',
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
        'summary',
        'title',
        'videoUrl',
        {
          guests: [
            'id',
            {
              member: [
                'id',
                { user: ['id', 'firstName', 'lastName', 'pictureUrl'] }
              ]
            }
          ]
        }
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
