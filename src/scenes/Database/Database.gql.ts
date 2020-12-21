import { mutation, query } from 'gql-query-builder';

import { IMember, IQuestion } from '@store/entities';

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

export const DELETE_MEMBERS = mutation({
  operation: 'deleteMembers',
  variables: { memberIds: { required: true, type: '[String!]' } }
}).query;

export interface DemoteToAdminArgs {
  memberIds: string[];
}

export const DEMOTE_TO_MEMBER = mutation({
  fields: ['id', 'role'],
  operation: 'demoteToMember',
  variables: { memberIds: { required: true, type: '[String!]' } }
}).query;

export interface GetDatabaseResult {
  id: string;
  members: IMember;
  questions: IQuestion[];
}

export const GET_DATABASE = query({
  fields: [
    'id',
    { questions: ['category', 'id', 'title', 'type', 'version'] },
    {
      members: [
        'id',
        'role',
        'status',
        { allData: ['questionId', 'value'] },
        { user: ['id', 'firstName', 'lastName', 'email'] }
      ]
    }
  ],
  operation: 'getDatabase'
}).query;

export interface RenameQuestionArgs {
  id: string;
  title: string;
  version: number;
}

export const RENAME_QUESTION = mutation({
  fields: ['id', 'title'],
  operation: 'renameQuestion',
  variables: {
    id: { required: true },
    title: { required: true },
    version: { required: true, type: 'Int' }
  }
}).query;

export type PromoteToAdminArgs = DemoteToAdminArgs;

export const PROMOTE_TO_ADMIN = mutation({
  fields: ['id', 'role'],
  operation: 'promoteToAdmin',
  variables: { memberIds: { required: true, type: '[String!]' } }
}).query;
