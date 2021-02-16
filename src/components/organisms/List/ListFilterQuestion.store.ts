import { Action, action, createContextStore } from 'easy-peasy';

interface ListFilterQuestionModel {
  isOpen: boolean;
  setIsOpen: Action<ListFilterQuestionModel, boolean>;
}

const listFilterQuestionModel: ListFilterQuestionModel = {
  isOpen: false,

  setIsOpen: action((state, isOpen: boolean) => {
    return { ...state, isOpen };
  })
};

const ListFilterQuestionStore = createContextStore<ListFilterQuestionModel>(
  listFilterQuestionModel,
  { disableImmer: true }
);

export default ListFilterQuestionStore;
