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

export const RESPOND_TO_MEMBERS = mutation({
  operation: 'respondToMembers',
  variables: {
    memberIds: { required: true, type: '[String!]' },
    response: { required: true }
  }
}).query;
