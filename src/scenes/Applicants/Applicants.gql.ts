import { mutation, query } from 'gql-query-builder';

import { ICommunity } from '@store/entities';

export interface GetPendingApplicantsResult extends ICommunity {
  application: any;
}

export const GET_PENDING_APPLICATIONS = query({
  fields: [
    'id',
    {
      questions: [
        'category',
        'id',
        'inApplicantCard',
        'inApplication',
        'order',
        'title',
        'type',
        'version'
      ]
    },
    {
      members: [
        'id',
        'createdAt',
        'status',
        { applicantData: ['questionId', 'value'] }
      ]
    }
  ],
  operation: 'getApplicants'
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
