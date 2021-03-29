import { action, createContextStore } from 'easy-peasy';

import { DropdownModel } from './Dropdown.types';

export const dropdownModel: DropdownModel = {
  filteredValues: [],
  isOpen: false,
  options: { attribute: true, multiple: false },
  searchString: '',
  setIsOpen: action((state, isOpen: boolean) => {
    return { ...state, isOpen };
  }),

  setSearchString: action((state, searchString: string) => {
    return {
      ...state,
      filteredValues: [...state.values].filter((option: string) =>
        option?.toLowerCase().includes(searchString.toLowerCase())
      ),
      searchString
    };
  }),

  setValue: action((state, value) => {
    return { ...state, value };
  }),

  setValues: action((state, values) => {
    return {
      ...state,
      filteredValues: values,
      values
    };
  }),

  setWidth: action((state, width: number) => {
    return { ...state, width };
  }),
  value: null,
  values: [],
  width: 0
};

const DropdownStore = createContextStore<DropdownModel>(
  (runtimeModel: DropdownModel) => runtimeModel,
  { disableImmer: true }
);

export default DropdownStore;
