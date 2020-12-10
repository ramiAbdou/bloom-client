import { mutation, query } from 'gql-query-builder';

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

export const RENAME_QUESTION = mutation({
  fields: ['id', 'title'],
  operation: 'renameQuestion',
  variables: {
    id: { required: true },
    title: { required: true },
    version: { required: true, type: 'Int' }
  }
}).query;

export const TOGGLE_ADMINS = mutation({
  fields: ['id', 'role'],
  operation: 'toggleAdmins',
  variables: { memberIds: { required: true, type: '[String!]' } }
}).query;
