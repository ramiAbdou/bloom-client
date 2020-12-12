import { Action, action, createContextStore } from 'easy-peasy';

import { LoadingModel, loadingModel } from '@store/Loading.store';

export interface DirectoryModel extends LoadingModel {
  searchString: string;
  setSearchString: Action<DirectoryModel, string>;
}

const model: DirectoryModel = {
  ...loadingModel,
  searchString: '',
  setSearchString: action((state, searchString) => ({ ...state, searchString }))
};

export default createContextStore<DirectoryModel>(model, {
  disableImmer: true
});
