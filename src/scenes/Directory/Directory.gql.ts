import { query } from 'gql-query-builder';

// ## GET DIRECTORY

export const GET_DIRECTORY = query({
  fields: [
    'id',
    {
      members: [
        'id',
        'status',
        { data: ['id', 'value', { question: ['id'] }] },
        { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
      ]
    }
  ],
  operation: 'getDirectory'
}).query;

// ## GET DIRECTORY QUESTIONS

export const GET_DIRECTORY_QUESTIONS = query({
  fields: [
    'category',
    'id',
    'inDirectoryCard',
    'inExpandedDirectoryCard',
    'title',
    'type',
    'version',
    { community: ['id'] }
  ],
  operation: 'getQuestions'
}).query;
