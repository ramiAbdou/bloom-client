/**
 * @fileoverview State: Dropdown
 * @author Rami Abdou
 */

import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';

import { FormOption } from '@constants';
import { filterOptions } from '@util/util';

interface DropdownModel {
  filteredOptions: Computed<DropdownModel, FormOption[]>;
  options: FormOption[];
  searchString: string;
  setSearchString: Action<DropdownModel, string>;
  setWidth: Action<DropdownModel, number>;
  title: string;
  width: number;
}

const model: DropdownModel = {
  filteredOptions: computed(({ options, searchString }) =>
    filterOptions(options, searchString)
  ),
  options: [],
  searchString: '',
  setSearchString: action((state, searchString) => ({
    ...state,
    searchString
  })),
  setWidth: action((state, width) => ({ ...state, width })),
  title: '',
  width: 0
};

type DropdownStoreInitializer = { options: FormOption[]; title: string };

export default createContextStore<DropdownModel>(
  ({ options, title }: DropdownStoreInitializer) => ({
    ...model,
    options,
    title
  }),
  { disableImmer: true }
);
