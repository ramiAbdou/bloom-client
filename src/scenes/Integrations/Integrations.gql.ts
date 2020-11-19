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
        'isZoomAuthenticated',
        'mailchimpListId',
        'mailchimpListName',
        { mailchimpLists: ['id', 'name'] },
        { zoomAccountInfo: ['email', 'pmi', 'userId'] }
      ]
    }
  ],
  operation: 'getIntegrations'
}).query;

export const UPDATE_MAILCHIMP_LIST_ID = mutation({
  fields: ['id', 'mailchimpListId', 'mailchimpListName'],
  operation: 'updateMailchimpListId',
  variables: { mailchimpListId: { required: true } }
}).query;
