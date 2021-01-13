import { Action, action, createContextStore } from 'easy-peasy';

export interface DirectoryModel {
  numMembers: number;
  searchString: string;
  setNumMembers: Action<DirectoryModel, number>;
  setSearchString: Action<DirectoryModel, string>;
}

const model: DirectoryModel = {
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
