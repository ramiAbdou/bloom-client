import { Action, action, createContextStore } from 'easy-peasy';

import { filterOptions } from '@util/util';

export type MultipleSelectModel = {
  closeOptions: Action<MultipleSelectModel>;
  filteredOptions: string[];
  isOpen: boolean;
  options: string[];
  openOptions: Action<MultipleSelectModel>;
  searchString: string;
  setSearchString: Action<MultipleSelectModel, string>;
  setWidth: Action<MultipleSelectModel, number>;
  title: string;
  width: number;
};

export const multipleSelectModel: MultipleSelectModel = {
  closeOptions: action((state) => ({ ...state, isOpen: false })),

  filteredOptions: [],

  isOpen: false,

  openOptions: action((state) => ({ ...state, isOpen: true })),

  options: [],

  searchString: '',

  setSearchString: action(({ options, ...state }, searchString: string) => ({
    ...state,
    filteredOptions: filterOptions(options, searchString),
    options,
    searchString
  })),

  setWidth: action((state, width: number) => ({ ...state, width })),

  title: '',

  width: 0
};

export default createContextStore<MultipleSelectModel>(
  (runtimeModel: MultipleSelectModel) => runtimeModel,
  { disableImmer: true }
);
