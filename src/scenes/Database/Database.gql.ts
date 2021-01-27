import { mutation, query } from 'gql-query-builder';

import { IMember, IQuestion } from '@store/entities';

// DELETE MEMBERS

export interface DeleteMembersArgs {
  memberIds: string[];
}

export const DELETE_MEMBERS = mutation({
  operation: 'deleteMembers',
  variables: { memberIds: { required: true, type: '[String!]' } }
}).query;

// DEMOTE TO MEMBER

export interface DemoteToAdminArgs {
  memberIds: string[];
}

export const DEMOTE_TO_MEMBER = mutation({
  fields: ['id', 'role'],
  operation: 'demoteToMember',
  variables: { memberIds: { required: true, type: '[String!]' } }
}).query;

// GET DATABASE

export interface GetDatabaseResult {
  id: string;
  members: IMember;
  questions: IQuestion[];
}

export const GET_DATABASE = query({
  fields: [
    'id',
    { integrations: ['id', 'stripeAccountId'] },
    { questions: ['category', 'id', 'title', 'type', 'version'] },
    {
      members: [
        'id',
        'duesStatus',
        'joinedAt',
        'role',
        'status',
        { data: ['id', 'value', { question: ['id'] }] },
        { type: ['id', 'name'] },
        { user: ['id', 'email', 'firstName', 'gender', 'lastName'] }
      ]
    }
  ],
  operation: 'getDatabase'
}).query;

// PROMOTE TO ADMIN

export type PromoteToAdminArgs = DemoteToAdminArgs;

export const PROMOTE_TO_ADMIN = mutation({
  fields: ['id', 'role'],
  operation: 'promoteToAdmin',
  variables: { memberIds: { required: true, type: '[String!]' } }
}).query;

// RENAME QUESTION

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
