import { action, createContextStore } from 'easy-peasy';

import { ListModel } from './List.types';

const listModel: ListModel = {
  numResults: 0,

  searchString: null,

  setNumResults: action((state, numResults: number) => ({
    ...state,
    numResults
  })),

  setSearchString: action((state, searchString) => ({ ...state, searchString }))
};

const ListStore = createContextStore<ListModel>(
  { ...listModel },
  { disableImmer: true }
);

export default ListStore;
