/**
 * @fileoverview GraphQL: Signup
 * @author Rami Abdou
 */

import { query } from 'gql-query-builder';

export const GET_MEMBERS = query({
  fields: [
    'id',
    { data: [{ question: ['type', 'title'] }, 'value'] },
    { user: ['email', 'firstName', 'lastName'] }
  ],
  operation: 'getMembers'
}).query;
