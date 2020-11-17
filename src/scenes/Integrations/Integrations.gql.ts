/**
 * @fileoverview GraphQL: Signup
 * @author Rami Abdou
 */

import { query } from 'gql-query-builder';

export const GET_MAILCHIMP_LIST_IDS = query({
  fields: ['id', { integrations: ['mailchimpLists'] }],
  operation: 'getIntegrations'
}).query;
