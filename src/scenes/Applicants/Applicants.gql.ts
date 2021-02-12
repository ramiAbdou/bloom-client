import { query } from 'gql-query-builder';

// ## GET APPLICANTS

export const GET_APPLICANTS = query({
  fields: [
    'id',
    'createdAt',
    'role',
    'status',
    { community: ['id'] },
    { data: ['id', 'value', { question: ['id'] }] },
    { type: ['id'] },
    { user: ['id', 'email', 'firstName', 'gender', 'lastName'] }
  ],
  operation: 'getApplicants'
}).query;

// ## RESPOND TO APPLICANTS

export interface RespondToApplicantsArgs {
  memberIds: string[];
  response: string;
}
