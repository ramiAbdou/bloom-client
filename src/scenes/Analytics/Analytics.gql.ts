import { query } from 'gql-query-builder';

// ## GET ACTIVE DUES GROWTH

export const GET_ACTIVE_DUES_GROWTH = query({
  operation: 'getActiveDuesGrowth'
}).query;

// ## GET ACTIVE MEMBERS GROWTH

export const GET_ACTIVE_MEMBERS_GROWTH = query({
  operation: 'getActiveMembersGrowth'
}).query;

export const GET_ACTIVE_MEMBERS_SERIES = query({
  fields: ['name', 'value'],
  operation: 'getActiveMembersSeries'
}).query;

// ## GET PAST EVENT ATTENDEES

export const GET_PAST_EVENT_ATTENDEES = query({
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
  operation: 'getPastEventAttendees'
}).query;

// ## GET PAST EVENT GUESTS

export const GET_PAST_EVENT_GUESTS = query({
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
  operation: 'getPastEventGuests'
}).query;

// ## GET PAST EVENT WATCHES

export const GET_PAST_EVENT_WATCHES = query({
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
  operation: 'getPastEventWatches'
}).query;

// ## GET PAYMENTS

export const GET_PAYMENTS = query({
  fields: [
    'amount',
    'createdAt',
    'id',
    'stripeInvoiceUrl',
    { community: ['id'] },
    { member: ['id', { user: ['id', 'firstName', 'lastName', 'email'] }] },
    { type: ['id'] }
  ],
  operation: 'getPayments'
}).query;

// ## GET TOTAL DUES GROWTH

export const GET_TOTAL_DUES_GROWTH = query({
  operation: 'getTotalDuesGrowth'
}).query;

export const GET_TOTAL_DUES_SERIES = query({
  fields: ['name', 'value'],
  operation: 'getTotalDuesSeries'
}).query;

// ## GET TOTAL MEMBERS GROWTH

export const GET_TOTAL_MEMBERS_GROWTH = query({
  operation: 'getTotalMembersGrowth'
}).query;

export const GET_TOTAL_MEMBERS_SERIES = query({
  fields: ['name', 'value'],
  operation: 'getTotalMembersSeries'
}).query;
