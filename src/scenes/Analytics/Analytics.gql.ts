import { query } from 'gql-query-builder';

// ## GET ACTIVE GROWTH

export const GET_ACTIVE_MEMBERS_GROWTH = query({
  operation: 'getActiveMembersGrowth'
}).query;

export const GET_ACTIVE_MEMBERS_SERIES = query({
  fields: ['name', 'value'],
  operation: 'getActiveMembersSeries'
}).query;

// ## GET DUES ANALYTICS

export const GET_DUES_ANALYTICS = query({
  fields: ['name', 'value'],
  operation: 'getDuesAnalytics'
}).query;

// ## GET PAYMENTS

export const GET_PAYMENTS = query({
  fields: [
    'id',
    {
      payments: [
        'amount',
        'createdAt',
        'id',
        'stripeInvoiceUrl',
        { member: ['id', { user: ['id', 'firstName', 'lastName', 'email'] }] },
        { type: ['id'] }
      ]
    }
  ],
  operation: 'getPayments'
}).query;

// ## GET TOTAL DUES COLLECTED

export interface GetTotalDuesCollectedResult {
  amount: number;
  percentage: number;
}

export const GET_TOTAL_DUES_COLLECTED = query({
  fields: ['amount', 'percentage'],
  operation: 'getTotalDuesCollected'
}).query;

// ## GET TOTAL GROWTH

export const GET_TOTAL_MEMBERS_GROWTH = query({
  operation: 'getTotalMembersGrowth'
}).query;

export const GET_TOTAL_MEMBERS_SERIES = query({
  fields: ['name', 'value'],
  operation: 'getTotalMembersSeries'
}).query;
