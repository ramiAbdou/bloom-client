import { mutation } from 'gql-query-builder';

// ## SWITCH MEMBER

export interface SwitchMemberArgs {
  memberId: string;
}

export const SWITCH_MEMBER = mutation({
  operation: 'switchMember',
  variables: { memberId: { required: true } }
}).query;
