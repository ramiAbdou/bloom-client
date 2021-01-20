import { Action, action, createContextStore } from 'easy-peasy';

export interface ListModel {
  numResults: number;
  searchString: string;
  setNumResults: Action<ListModel, number>;
  setSearchString: Action<ListModel, string>;
}

const model: ListModel = {
  numResults: 0,
  searchString: '',
  setNumResults: action((state, numResults: number) => ({
    ...state,
    numResults
  })),
  setSearchString: action((state, searchString) => ({ ...state, searchString }))
};

const ListStore = createContextStore<ListModel>(model, { disableImmer: true });

export default ListStore;
