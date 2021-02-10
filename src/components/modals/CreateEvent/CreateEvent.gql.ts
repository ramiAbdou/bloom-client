import { mutation } from 'gql-query-builder';

// ## CREATE EVENT

export const CREATE_EVENT = mutation({
  fields: [
    'description',
    'endTime',
    'eventUrl',
    'id',
    'imageUrl',
    'private',
    'recordingUrl',
    'startTime',
    'summary',
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

// ## DELETE EVENT

export interface DeleteEventArgs {
  id: string;
}

export const DELETE_EVENT = mutation({
  operation: 'deleteEvent',
  variables: { id: { required: true } }
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
