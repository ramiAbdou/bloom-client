import { mutation, query } from 'gql-query-builder';

export const GET_INTEGRATIONS = query({
  fields: [
    'id',
    {
      integrations: [
        'id',
        'isMailchimpAuthenticated',
        'mailchimpListId',
        'mailchimpListName',
        { mailchimpLists: ['id', 'name'] },
        'stripeAccountId'
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
