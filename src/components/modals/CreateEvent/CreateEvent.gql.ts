import { mutation } from 'gql-query-builder';

// ## CREATE EVENT

export const CREATE_EVENT = mutation({
  fields: ['id'],
  operation: 'createEvent',
  variables: {
    description: { required: true },
    endTime: { required: true },
    imageUrl: { required: false },
    private: { required: false, type: 'Boolean' },
    startTime: { required: true },
    title: { required: true },
    videoUrl: { required: true }
  }
}).query;
