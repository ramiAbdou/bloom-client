import { mutation } from 'gql-query-builder';

export interface SendTemporaryLoginLinkArgs {
  email: string;
}

export const SEND_TEMPORARY_LOGIN_LINK = mutation({
  operation: 'sendTemporaryLoginLink',
  variables: { email: { required: true } }
}).query;
