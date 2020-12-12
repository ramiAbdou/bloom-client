import { Action, action, createContextStore } from 'easy-peasy';

export type DropdownModel = {
  isOpen: boolean;
  options: string[];
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
