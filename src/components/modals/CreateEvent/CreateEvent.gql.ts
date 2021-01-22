import { mutation } from 'gql-query-builder';

// ## CREATE EVENT

export const CREATE_EVENT = mutation({
  fields: [
    'endTime',
    'id',
    'startTime',
    'title',
    'videoUrl',
    { community: ['id'] }
  ],
  operation: 'createEvent',
  variables: {
    description: { required: true },
    endTime: { required: true },
    imageUrl: { required: false },
    private: { required: false, type: 'Boolean' },
    startTime: { required: true },
    summary: { required: false },
    title: { required: true },
    videoUrl: { required: true }
  }
}).query;

// ## UPDATE EVENT

export const UPDATE_EVENT = mutation({
  fields: [
    'description',
    'id',
    'imageUrl',
    'private',
    'summary',
    'title',
    'videoUrl'
  ],
  operation: 'updateEvent',
  variables: {
    description: { required: false },
    id: { required: true },
    imageUrl: { required: false },
    private: { required: false, type: 'Boolean' },
    summary: { required: false },
    title: { required: false },
    videoUrl: { required: false }
  }
}).query;
