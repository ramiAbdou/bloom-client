import { query } from 'gql-query-builder';

// ## GET DIRECTORY

export const GET_DIRECTORY = query({
  fields: [
    'id',
    'status',
    { community: ['id'] },
    { data: ['id', 'value', { question: ['id'] }] },
    { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
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
    { community: ['id'] }
  ],
  operation: 'getQuestions'
}).query;
