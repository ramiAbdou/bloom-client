import { query } from 'gql-query-builder';

// ## GET TYPES

export const GET_TYPES = query({
  fields: [
    'amount',
    'id',
    'isFree',
    'name',
    'recurrence',
    { community: ['id'] }
  ],
  operation: 'getTypes',
  variables: { urlName: { required: false } }
}).query;
