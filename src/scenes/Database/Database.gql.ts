/**
 * @fileoverview GraphQL: Database
 * @author Rami Abdou
 */

import { query } from 'gql-query-builder';

export const GET_DATABASE = query({
  fields: [
    'id',
    { questions: ['category', 'id', 'title', 'type'] },
    { memberships: ['id', { allData: ['questionId', 'value'] }] }
  ],
  operation: 'getDatabase'
}).query;
