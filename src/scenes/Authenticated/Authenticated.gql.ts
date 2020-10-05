/**
 * @fileoverview GraphQL: Signup
 * @author Rami Abdou
 */

import { query } from 'gql-query-builder';

export const GET_USER = query({
  fields: ['email', 'id', 'firstName', 'lastName'],
  operation: 'getUser'
}).query;
