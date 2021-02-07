import { query } from 'gql-query-builder';

// ## GET DIRECTORY

export const GET_DIRECTORY = query({
  fields: [
    'id',
    'status',
    { community: ['id'] },
    { data: ['id', 'value', { question: ['id'] }] },
    { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
  ],
  operation: 'getDirectory'
}).query;
