import { createContextStore } from 'easy-peasy';

import { IEvent } from '@store/entities';

const EventsCardStore = createContextStore<IEvent>(
  (runtimeModel) => runtimeModel,
  { disableImmer: true }
);

export default EventsCardStore;
