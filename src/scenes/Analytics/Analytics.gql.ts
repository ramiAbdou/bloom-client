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

// ## GET PAYMENTS

export const GET_DUES_HISTORY = query({
  fields: [
    'amount',
    'createdAt',
    'id',
    'stripeInvoiceUrl',
    { member: ['id', { user: ['id', 'firstName', 'lastName', 'email'] }] },
    { type: ['id'] }
  ],
  operation: 'getDuesHistory'
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
