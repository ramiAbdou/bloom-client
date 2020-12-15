import { query } from 'gql-query-builder';

export const GET_ACTIVE_MEMBER_ANALYTICS = query({
  fields: ['activeGrowth', { activeChartData: ['name', 'value'] }],
  operation: 'getActiveMemberAnalytics'
}).query;

export const GET_TOTAL_MEMBER_ANALYTICS = query({
  fields: ['totalGrowth', { totalChartData: ['name', 'value'] }],
  operation: 'getTotalMemberAnalytics'
}).query;
