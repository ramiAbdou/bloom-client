/**
 * @fileoverview GraphQL: Signup
 * @author Rami Abdou
 */

import { query } from 'gql-query-builder';

export const GET_INTEGRATIONS = query({
  fields: [
    'id',
    { integrations: ['id', 'isMailchimpAuthenticated', 'mailchimpLists'] }
  ],
  operation: 'getIntegrations'
}).query;
