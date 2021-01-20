import { query } from 'gql-query-builder';

export const GET_EVENTS = query({
  fields: [
    'id',
    {
      events: [
        'description',
        'endTime',
        'imageUrl',
        'private',
        'startTime',
        'title',
        'videoUrl'
      ]
    }
  ],
  operation: 'getEvents'
}).query;
