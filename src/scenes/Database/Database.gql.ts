/**
 * @fileoverview GraphQL: Database
 * @author Rami Abdou
 */

import { mutation, query } from 'gql-query-builder';

export const GET_DATABASE = query({
  fields: [
    'id',
    { questions: ['category', 'id', 'title', 'type'] },
    { memberships: ['id', { allData: ['questionId', 'value'] }] }
  ],
  operation: 'getDatabase'
}).query;

export const DELETE_MEMBERSHIPS = mutation({
  operation: 'deleteMemberships',
  variables: { membershipIds: { required: true, type: '[String!]' } }
}).query;
