import { mutation, query } from 'gql-query-builder';

// ## GET INTEGRATIONS

export const GET_INTEGRATIONS = query({
  fields: [
    'id',
    'isMailchimpAuthenticated',
    'mailchimpListId',
    'mailchimpListName',
    'stripeAccountId',
    { community: ['id'] },
    { mailchimpLists: ['id', 'name'] }
  ],
  operation: 'getIntegrations'
}).query;

// ## UPDATE MAILCHIMP LIST ID

export interface UpdateMailchimpListIdArgs {
  mailchimpListId: string;
}

export const UPDATE_MAILCHIMP_LIST_ID = mutation({
  fields: ['id', 'mailchimpListId', 'mailchimpListName'],
  operation: 'updateMailchimpListId',
  variables: { mailchimpListId: { required: true } }
}).query;
