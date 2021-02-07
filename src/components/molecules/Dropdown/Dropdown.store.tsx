import { action, createContextStore } from 'easy-peasy';

import { DropdownModel, DropdownOptions } from './Dropdown.types';

export const initialOptions: DropdownOptions = {
  attribute: true,
  multiple: false
};

export const dropdownModel: DropdownModel = {
  filteredValues: [],
  isOpen: false,
  options: { attribute: true, multiple: false },
  searchString: '',
  setIsOpen: action((state, isOpen: boolean) => ({ ...state, isOpen })),

  setSearchString: action((state, searchString: string) => {
    return {
      ...state,
      filteredOptions: [...state.values].filter((option: string) => {
        return option?.toLowerCase().includes(searchString.toLowerCase());
      }),
      searchString
    };
  }),

  setValue: action((state, value) => ({ ...state, value })),

  setValues: action((state, values) => ({
    ...state,
    filteredValues: values,
    values
  })),

  setWidth: action((state, width: number) => ({ ...state, width })),
  value: null,
  values: [],
  width: 0
};

const DropdownStore = createContextStore<DropdownModel>(
  (runtimeModel: DropdownModel) => runtimeModel,
  { disableImmer: true }
);

export default DropdownStore;
