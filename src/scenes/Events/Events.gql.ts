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

// ## GET EVENTS

export const GET_EVENTS = query({
  fields: [
    'id',
    {
      events: [
        'description',
        'endTime',
        'id',
        'imageUrl',
        'private',
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
