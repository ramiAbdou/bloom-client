import { Action, action, createContextStore } from 'easy-peasy';

import { IdProps } from '@constants';

export interface IDropdownOption extends Partial<IdProps> {
  title: string;
}

export type DropdownModel = {
  isOpen: boolean;
  options: IDropdownOption[];
  setIsOpen: Action<DropdownModel, boolean>;
  setWidth: Action<DropdownModel, number>;
  width: number;
};

export const dropdownModel: DropdownModel = {
  isOpen: false,
  options: [],
  setIsOpen: action((state, isOpen: boolean) => ({ ...state, isOpen })),
  setWidth: action((state, width: number) => ({ ...state, width })),
  width: 0
};

export default createContextStore<DropdownModel>(
  (runtimeModel: DropdownModel) => runtimeModel,
  { disableImmer: true }
);
