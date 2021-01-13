import { mutation } from 'gql-query-builder';

interface CreateMemberArgs {
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
}

export interface CreateMembersArgs {
  members: CreateMemberArgs[];
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
