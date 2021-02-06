import { action, createContextStore } from 'easy-peasy';

import { DropdownModel } from './Dropdown.types';

export const dropdownModel: DropdownModel = {
  filteredValues: [],
  isOpen: false,
  options: { multiple: false },
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
