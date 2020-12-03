/**
 * @fileoverview GraphQL: Login

 */

import { mutation } from 'gql-query-builder';

export const SEND_TEMPORARY_LOGIN_LINK = mutation({
  operation: 'sendTemporaryLoginLink',
  variables: { email: { required: true } }
}).query;
