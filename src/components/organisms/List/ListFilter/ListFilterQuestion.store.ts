import { Action, action, createContextStore } from 'easy-peasy';

interface ListFilterQuestionModel {
  addValue: Action<ListFilterQuestionModel, string>;
  isOpen: boolean;
  removeValue: Action<ListFilterQuestionModel, string>;
  setIsOpen: Action<ListFilterQuestionModel, boolean>;
  setValues: Action<ListFilterQuestionModel, string[]>;
  values: string[];
}

const listFilterQuestionModel: ListFilterQuestionModel = {
  addValue: action((state, value: string) => {
    return { ...state, values: [...state.values, value] };
  }),

  isOpen: false,

  removeValue: action((state, value: string) => {
    return {
      ...state,
      values: [...state.values].filter((element: string) => element !== value)
    };
  }),

  setIsOpen: action((state, isOpen: boolean) => {
    return { ...state, isOpen };
  }),

  setValues: action((state, values: string[]) => {
    return { ...state, values };
  }),

  values: []
};

const ListFilterQuestionStore = createContextStore<ListFilterQuestionModel>(
  listFilterQuestionModel,
  { disableImmer: true }
);

export default ListFilterQuestionStore;
