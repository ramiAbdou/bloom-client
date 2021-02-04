import { mutation, query } from 'gql-query-builder';

// ## GET APPLICANTS

export const GET_APPLICANTS = query({
  fields: [
    'id',
    'createdAt',
    'role',
    'status',
    { community: ['id'] },
    { data: ['id', 'value', { question: ['id'] }] },
    { type: ['id', 'name'] },
    { user: ['id', 'email', 'firstName', 'gender', 'lastName'] }
  ],
  operation: 'getApplicants'
}).query;

// ## GET APPLICANTS QUESTIONS

export const GET_APPLICANTS_QUESTIONS = query({
  fields: [
    'category',
    'id',
    'inApplicantCard',
    'inApplication',
    'order',
    'title',
    'type',
    'version',
    { community: ['id'] }
  ],
  operation: 'getQuestions'
}).query;

// ## RESPOND TO APPLICANTS

export interface RespondToApplicantsArgs {
  memberIds: string[];
  response: string;
}

export const RESPOND_TO_APPLICANTS = mutation({
  fields: ['id', 'status'],
  operation: 'respondToApplicants',
  variables: {
    memberIds: { required: true, type: '[String!]' },
    response: { required: true }
  }
}).query;
