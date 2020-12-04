import { Action, action, createContextStore } from 'easy-peasy';

import { filterOptions } from '@util/util';

export type MultipleSelectModel = {
  addOption: Action<MultipleSelectModel, string[]>;
  closeOptions: Action<MultipleSelectModel>;
  filteredOptions: string[];
  isOpen: boolean;
  options: string[];
  openOptions: Action<MultipleSelectModel>;
  searchString: string;
  removeOption: Action<MultipleSelectModel, string[]>;
  setSearchString: Action<MultipleSelectModel, string>;
  setWidth: Action<MultipleSelectModel, number>;
  title: string;
  width: number;
};

export const multipleSelectModel: MultipleSelectModel = {
  addOption: action(({ options, ...state }, nonFilteredValues: string[]) => ({
    ...state,
    filteredOptions: options.filter(
      (option: string) => !nonFilteredValues.includes(option)
    ),
    options
  })),

  closeOptions: action((state) => ({ ...state, isOpen: false })),

  filteredOptions: [],

  isOpen: false,

  openOptions: action((state) => ({ ...state, isOpen: true })),

  options: [],

  removeOption: action(
    ({ options, ...state }, nonFilteredValues: string[]) => ({
      ...state,
      filteredOptions: options.filter(
        (option: string) => !nonFilteredValues.includes(option)
      ),
      options
    })
  ),

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
