/**
 * @fileoverview GraphQL: Signup
 * @author Rami Abdou
 */

import { query } from 'gql-query-builder';

export const VERIFY_LOGIN_TOKEN = query({
  operation: 'verifyLoginToken',
  variables: { token: { required: true } }
}).query;
