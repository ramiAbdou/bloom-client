import { query } from 'gql-query-builder';

// ## GET ACTIVE MEMBER ANALYTICS

export interface GetActiveMemberAnalyticsResult {
  activeChartData: { name: string; value: number }[];
  activeGrowth: number;
}

export const GET_ACTIVE_MEMBER_ANALYTICS = query({
  fields: ['activeGrowth', { activeChartData: ['name', 'value'] }],
  operation: 'getActiveMemberAnalytics'
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

// ## GET TOTAL MEMBER ANALYTICS

export interface GetTotalMemberAnalyticsResult {
  totalChartData: { name: string; value: number }[];
  totalGrowth: number;
}

export const GET_TOTAL_MEMBER_ANALYTICS = query({
  fields: ['totalGrowth', { totalChartData: ['name', 'value'] }],
  operation: 'getTotalMemberAnalytics'
}).query;
