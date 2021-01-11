import { mutation } from 'gql-query-builder';

export interface ChangeCommunityArgs {
  memberId: string;
}

export const CHANGE_COMMUNITY = mutation({
  operation: 'changeCommunity',
  variables: { memberId: { required: true } }
}).query;
