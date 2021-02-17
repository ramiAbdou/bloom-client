import { Action, action, createContextStore, State } from 'easy-peasy';

interface ListFilterQuestionModel {
  addValue: Action<ListFilterQuestionModel, string>;
  removeValue: Action<ListFilterQuestionModel, string>;
  setValues: Action<ListFilterQuestionModel, string[]>;
  values: string[];
}

const listFilterQuestionStateModel: State<ListFilterQuestionModel> = {
  values: []
};

const listFilterQuestionModel: ListFilterQuestionModel = {
  ...listFilterQuestionStateModel,

  addValue: action((state, value: string) => {
    return { ...state, values: [...state.values, value] };
  }),

  removeValue: action((state, value: string) => {
    return {
      ...state,
      values: [...state.values].filter((element: string) => element !== value)
    };
  }),

  setValues: action((state, values: string[]) => {
    return { ...state, values };
  })
};

const ListFilterQuestionStore = createContextStore<ListFilterQuestionModel>(
  listFilterQuestionModel,
  { disableImmer: true }
);

export default ListFilterQuestionStore;
