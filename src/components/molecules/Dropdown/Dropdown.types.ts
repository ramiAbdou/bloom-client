import { Action } from 'easy-peasy';

export type DropdownValue = string | string[];

export interface DropdownOptions {
  attribute?: boolean;
  multiple?: boolean; // True if the dropdown is a multiple select.
}

export const defaultOptions: DropdownOptions = {
  attribute: true,
  multiple: false
};

export interface DropdownModel {
  filteredValues: string[];
  isOpen: boolean;
  onSelect?: (result: DropdownValue) => any;
  options: DropdownOptions;
  searchString: string;
  setSearchString: Action<DropdownModel, string>;
  setIsOpen: Action<DropdownModel, boolean>;
  setValue: Action<DropdownModel, DropdownValue>;
  setValues: Action<DropdownModel, string[]>;
  setWidth: Action<DropdownModel, number>;
  value: DropdownValue;
  values: string[];
  width: number;
}
