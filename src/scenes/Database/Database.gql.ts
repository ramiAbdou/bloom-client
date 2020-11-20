/**
 * @fileoverview GraphQL: Database
 * @author Rami Abdou
 */

import { query } from 'gql-query-builder';

export const GET_DATABASE = query({
  fields: ['id'],
  operation: 'getDatabase'
}).query;
