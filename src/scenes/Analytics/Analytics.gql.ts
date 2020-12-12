import { query } from 'gql-query-builder';

export const GET_QUESTIONS = query({
  fields: ['id', { questions: ['category', 'id', 'title', 'type', 'version'] }],
  operation: 'getDatabase'
}).query;
