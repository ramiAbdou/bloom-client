import { Action, action, createContextStore } from 'easy-peasy';

export type DirectoryModel = {
  searchString: string;
  setSearchString: Action<DirectoryModel, string>;
};

const model: DirectoryModel = {
  searchString: '',
  setSearchString: action((state, searchString) => ({ ...state, searchString }))
};

export default createContextStore<DirectoryModel>(model, {
  disableImmer: true
});
