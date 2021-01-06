import { mutation } from 'gql-query-builder';

export interface CreateMembersArgs {
  members: {
    email: string;
    firstName: string;
    isAdmin: boolean;
    lastName: string;
  }[];
}

export const CREATE_MEMBERS = mutation({
  fields: [
    'id',
    'role',
    'status',
    { allData: ['questionId', 'value'] },
    { user: ['id', 'firstName', 'lastName', 'email'] }
  ],
  operation: 'createMembers',
  variables: { members: { required: true, type: '[NewMemberInput!]' } }
}).query;
