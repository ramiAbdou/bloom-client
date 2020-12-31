import { Action, action, createContextStore } from 'easy-peasy';

import { LoadingModel, loadingModel } from '@store/Loading.store';

export interface DirectoryModel extends LoadingModel {
  numMembers: number;
  searchString: string;
  setNumMembers: Action<DirectoryModel, number>;
  setSearchString: Action<DirectoryModel, string>;
}

const model: DirectoryModel = {
  ...loadingModel,
  numMembers: 0,
  searchString: '',
  setNumMembers: action((state, numMembers: number) => ({
    ...state,
    numMembers
  })),
  setSearchString: action((state, searchString) => ({ ...state, searchString }))
};

export default createContextStore<DirectoryModel>(model, {
  disableImmer: true
});
