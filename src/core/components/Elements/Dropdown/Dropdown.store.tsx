import { Action, action, createContextStore } from 'easy-peasy';

import { IdProps } from '@constants';

export interface IDropdownOption extends Partial<IdProps> {
  title: string;
}

export type DropdownModel = {
  filteredOptions: IDropdownOption[];
  isOpen: boolean;
  options: IDropdownOption[];
  searchString: string;
  setSearchString: Action<DropdownModel, string>;
  setIsOpen: Action<DropdownModel, boolean>;
  setWidth: Action<DropdownModel, number>;
  width: number;
};

export const dropdownModel: DropdownModel = {
  filteredOptions: [],
  isOpen: false,
  options: [],
  searchString: '',
  setIsOpen: action((state, isOpen: boolean) => ({ ...state, isOpen })),

  setSearchString: action(({ options, ...state }, searchString: string) => ({
    ...state,
    filteredOptions: options.filter(({ title }: IDropdownOption) => {
      return title?.toLowerCase().includes(searchString.toLowerCase());
    }),
    options,
    searchString
  })),
  setWidth: action((state, width: number) => ({ ...state, width })),
  width: 0
};

export default createContextStore<DropdownModel>(
  (runtimeModel: DropdownModel) => runtimeModel,
  { disableImmer: true }
);
