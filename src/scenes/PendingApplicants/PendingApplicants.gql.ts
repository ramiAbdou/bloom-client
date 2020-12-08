import { mutation, query } from 'gql-query-builder';

export const GET_PENDING_APPLICATIONS = query({
  fields: [
    'id',
    {
      application: [
        {
          questions: [
            'category',
            'id',
            'inApplicantCard',
            'order',
            'title',
            'type',
            'version'
          ]
        }
      ]
    },
    {
      memberships: [
        'id',
        'createdAt',
        { applicantData: ['questionId', 'value'] },
        'status'
      ]
    }
  ],
  operation: 'getApplicants'
}).query;

export const RESPOND_TO_MEMBERSHIPS = mutation({
  operation: 'respondToMemberships',
  variables: {
    membershipIds: { required: true, type: '[String!]' },
    response: { required: true }
  }
}).query;
