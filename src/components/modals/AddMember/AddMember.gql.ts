import { mutation } from 'gql-query-builder';

interface AddMemberArgs {
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
}

export interface AddMembersArgs {
  members: AddMemberArgs[];
}

export const ADD_MEMBERS = mutation({
  fields: [
    'id',
    'role',
    'status',
    { user: ['id', 'firstName', 'lastName', 'email'] }
  ],
  operation: 'addMembers',
  variables: { members: { required: true, type: '[AddMemberInput!]' } }
}).query;
