import { query } from 'gql-query-builder';

// ## GET MEMBER PROFILE

export interface GetMemberProfileArgs {
  memberId: string;
}

export const GET_MEMBER_PROFILE = query({
  fields: ['id', 'bio', 'joinedAt', { type: ['id'] }, { user: ['id'] }],
  operation: 'getMemberProfile',
  variables: { memberId: { required: true } }
}).query;
