/**
 * @fileoverview GraphQL: Login
 * @author Rami Abdou
 */

import { query } from 'gql-query-builder';

export const DOES_USER_EXIST = query({
  operation: 'doesUserExist',
  variables: { email: { required: true } }
}).query;
