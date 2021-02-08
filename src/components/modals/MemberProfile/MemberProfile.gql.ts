import { query } from 'gql-query-builder';

// ## GET MEMBER PROFILE

export interface GetMemberProfileArgs {
  memberId: string;
}

export const GET_MEMBER_PROFILE = query({
  fields: [
    'id',
    'bio',
    'joinedAt',
    { data: ['id', 'value', { question: ['id'] }] },
    { type: ['id', 'name'] },
    {
      user: [
        'id',
        'email',
        'facebookUrl',
        'instagramUrl',
        'linkedInUrl',
        'firstName',
        'lastName',
        'pictureUrl',
        'twitterUrl'
      ]
    }
  ],
  operation: 'getMemberProfile',
  variables: { memberId: { required: true } }
}).query;
