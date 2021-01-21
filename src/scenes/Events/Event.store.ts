import { createContextStore } from 'easy-peasy';

import { IEvent } from '@store/entities';

const EventStore = createContextStore<IEvent>((runtimeModel) => runtimeModel, {
  disableImmer: true
});

export default EventStore;
