import { Action, action, createContextStore } from 'easy-peasy';

export type DirectoryModel = {
  loading: boolean;
  searchString: string;
  setLoading: Action<DirectoryModel, boolean>;
  setSearchString: Action<DirectoryModel, string>;
};

const model: DirectoryModel = {
  loading: false,
  searchString: '',
  setLoading: action((state, loading: boolean) => ({ ...state, loading })),
  setSearchString: action((state, searchString) => ({ ...state, searchString }))
};

export default createContextStore<DirectoryModel>(model, {
  disableImmer: true
});
