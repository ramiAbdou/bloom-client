import { query } from 'gql-query-builder';

export const GET_MEMBER_ANALYTICS = query({
  fields: ['totalGrowth', { totalChartData: ['name', 'value'] }],
  operation: 'getMemberAnalytics'
}).query;
