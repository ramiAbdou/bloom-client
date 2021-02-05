import { mutation, query } from 'gql-query-builder';

export interface MemberIdsArgs {
  memberIds: string[];
}

// DELETE MEMBERS

export const DELETE_MEMBERS = mutation({
  operation: 'deleteMembers',
  variables: { memberIds: { required: true, type: '[String!]' } }
}).query;

// DEMOTE TO MEMBER

export const DEMOTE_MEMBERS = mutation({
  fields: ['id', 'role'],
  operation: 'demoteMembers',
  variables: { memberIds: { required: true, type: '[String!]' } }
}).query;

// GET DATABASE

export const GET_DATABASE = query({
  fields: [
    'id',
    'isDuesActive',
    'joinedAt',
    'role',
    'status',
    { community: ['id'] },
    { data: ['id', 'value', { question: ['id'] }] },
    { type: ['id'] },
    { user: ['id', 'email', 'firstName', 'gender', 'lastName'] }
  ],
  operation: 'getDatabase'
}).query;

// GET DATABASE QUESTIONS

export const GET_DATABASE_QUESTIONS = query({
  fields: [
    'category',
    'id',
    'inExpandedDirectoryCard',
    'title',
    'type',
    { community: ['id'] }
  ],
  operation: 'getQuestions'
}).query;

// PROMOTE MEMBERS

export const PROMOTE_MEMBERS = mutation({
  fields: ['id', 'role'],
  operation: 'promoteMembers',
  variables: { memberIds: { required: true, type: '[String!]' } }
}).query;

// RENAME QUESTION

export interface RenameQuestionArgs {
  id: string;
  title: string;
}

export const RENAME_QUESTION = mutation({
  fields: ['id', 'title'],
  operation: 'renameQuestion',
  variables: {
    id: { required: true },
    title: { required: true }
  }
}).query;
