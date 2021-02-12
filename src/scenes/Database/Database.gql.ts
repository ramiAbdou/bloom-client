import { query } from 'gql-query-builder';

export interface MemberIdsArgs {
  memberIds: string[];
}

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

// RENAME QUESTION

export interface UpdateQuestionArgs {
  questionId: string;
  title: string;
}
