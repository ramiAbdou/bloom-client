import { query } from 'gql-query-builder';

export const GET_DIRECTORY = query({
  fields: [
    'id',
    {
      questions: [
        'category',
        'id',
        'inDirectoryCard',
        'inExpandedDirectoryCard',
        'title',
        'type',
        'version'
      ]
    },
    {
      memberships: [
        'bio',
        'id',
        { cardData: ['questionId', 'value'] },
        {
          user: [
            'id',
            'currentLocation',
            'facebookUrl',
            'firstName',
            'lastName',
            'instagramUrl',
            'linkedInUrl',
            'pictureUrl',
            'twitterUrl'
          ]
        }
      ]
    }
  ],
  operation: 'getDirectory'
}).query;
