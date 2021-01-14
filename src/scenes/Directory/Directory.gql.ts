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
      members: [
        'bio',
        'id',
        'role',
        'status',
        { cardData: ['questionId', 'value'] },
        { type: ['id', 'name'] },
        {
          user: [
            'id',
            'currentLocation',
            'email',
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
