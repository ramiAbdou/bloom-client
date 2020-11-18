/**
 * @fileoverview GraphQL: Signup
 * @author Rami Abdou
 */

import { mutation, query } from 'gql-query-builder';

export const GET_INTEGRATIONS = query({
  fields: [
    'id',
    {
      integrations: [
        'id',
        'isMailchimpAuthenticated',
        'mailchimpListId',
        { mailchimpLists: ['id', 'name'] }
      ]
    }
  ],
  operation: 'getIntegrations'
}).query;

export const UPDATE_MAILCHIMP_LIST_ID = mutation({
  operation: 'updateMailchimpListId',
  variables: { mailchimpListId: { required: true } }
}).query;
