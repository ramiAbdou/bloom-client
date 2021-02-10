import { mutation } from 'gql-query-builder';

// ## UPDATE MAILCHIMP LIST ID

export interface UpdateMailchimpListIdArgs {
  mailchimpListId: string;
}

export const UPDATE_MAILCHIMP_LIST_ID = mutation({
  fields: ['id', 'mailchimpListId', 'mailchimpListName'],
  operation: 'updateMailchimpListId',
  variables: { mailchimpListId: { required: true } }
}).query;
