import { query } from 'gql-query-builder';

export interface GetActiveMemberAnalyticsResult {
  activeChartData: { name: string; value: number }[];
  activeGrowth: number;
}

export const GET_ACTIVE_MEMBER_ANALYTICS = query({
  fields: ['activeGrowth', { activeChartData: ['name', 'value'] }],
  operation: 'getActiveMemberAnalytics'
}).query;

export interface GetTotalMemberAnalyticsResult {
  totalChartData: { name: string; value: number }[];
  totalGrowth: number;
}

export const GET_TOTAL_MEMBER_ANALYTICS = query({
  fields: ['totalGrowth', { totalChartData: ['name', 'value'] }],
  operation: 'getTotalMemberAnalytics'
}).query;
