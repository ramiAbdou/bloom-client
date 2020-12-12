import { createContextStore } from 'easy-peasy';

import { LoadingModel, loadingModel } from '@store/Loading.store';

export default createContextStore<LoadingModel>(loadingModel, {
  disableImmer: true
});
