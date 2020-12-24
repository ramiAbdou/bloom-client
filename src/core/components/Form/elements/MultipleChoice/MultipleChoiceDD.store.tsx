import { Action, action, createContextStore } from 'easy-peasy';

export type MultipleChoiceModel = {
  closeOptions: Action<MultipleChoiceModel>;
  filteredOptions: string[];
  isOpen: boolean;
  options: string[];
  openOptions: Action<MultipleChoiceModel>;
  searchString: string;
  setSearchString: Action<MultipleChoiceModel, string>;
  setWidth: Action<MultipleChoiceModel, number>;
  title: string;
  width: number;
};

export const multipleChoiceModel: MultipleChoiceModel = {
  closeOptions: action((state) => ({ ...state, isOpen: false })),

  filteredOptions: [],

  isOpen: false,

  openOptions: action((state) => ({ ...state, isOpen: true })),

  options: [],

  searchString: '',

  setSearchString: action(({ options, ...state }, searchString: string) => ({
    ...state,
    filteredOptions: options.filter((option: string) =>
      option?.toLowerCase()?.includes(searchString.toLowerCase())
    ),
    options,
    searchString
  })),

  setWidth: action((state, width: number) => ({ ...state, width })),

  title: '',

  width: 0
};

export default createContextStore<MultipleChoiceModel>(
  (runtimeModel: MultipleChoiceModel) => runtimeModel,
  { disableImmer: true }
);
