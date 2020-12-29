import { Action, action, createContextStore } from 'easy-peasy';

export type DropdownModel = {
  attribute?: boolean; // Uses attributes if true, uses plain text otherwise.
  filteredOptions: string[];
  isOpen: boolean;
  multiple?: boolean; // True if the dropdown is a multiple select.
  onSelect: (result: string[]) => any;
  options: string[];
  searchString: string;
  setSearchString: Action<DropdownModel, string>;
  setIsOpen: Action<DropdownModel, boolean>;
  setValue: Action<DropdownModel, string[]>;
  setWidth: Action<DropdownModel, number>;
  value: string[];
  width: number;
};

export const dropdownModel: DropdownModel = {
  attribute: false,

  filteredOptions: [],

  isOpen: false,

  multiple: false,

  onSelect: null,

  options: [],

  searchString: '',

  setIsOpen: action((state, isOpen: boolean) => ({ ...state, isOpen })),

  setSearchString: action(({ options, ...state }, searchString: string) => ({
    ...state,
    filteredOptions: options.filter((option: string) => {
      return option?.toLowerCase().includes(searchString.toLowerCase());
    }),
    options,
    searchString
  })),

  setValue: action((state, value: string[]) => ({ ...state, value })),

  setWidth: action((state, width: number) => ({ ...state, width })),

  value: [],

  width: 0
};

export default createContextStore<DropdownModel>(
  (runtimeModel: DropdownModel) => runtimeModel,
  { disableImmer: true }
);
