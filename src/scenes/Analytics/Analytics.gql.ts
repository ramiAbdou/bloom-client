import { query } from 'gql-query-builder';

export const GET_TIME_SERIES = query({
  fields: ['name', 'value'],
  operation: 'getTimeSeries'
}).query;
