import { mutation } from 'gql-query-builder';

// SEND TEMPORARY LOGIN LINK

export interface SendTemporaryLoginLinkArgs {
  email: string;
}

export const SEND_TEMPORARY_LOGIN_LINK = mutation({
  operation: 'sendTemporaryLoginLink',
  variables: { email: { required: true } }
}).query;
