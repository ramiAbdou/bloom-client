import { createContextStore } from 'easy-peasy';

import { IdProps } from '@constants';

const IdStore = createContextStore<IdProps>((runtimeModel) => runtimeModel, {
  disableImmer: true
});

export default IdStore;
