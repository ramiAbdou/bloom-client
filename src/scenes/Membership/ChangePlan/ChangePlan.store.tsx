import { Action, action, createContextStore } from 'easy-peasy';

type ChangePlanModel = {
  selectedTypeId: string;
  setSelectedTypeId: Action<ChangePlanModel, string>;
};

const model: ChangePlanModel = {
  selectedTypeId: null,

  setSelectedTypeId: action((state, selectedTypeId: string) => ({
    ...state,
    selectedTypeId
  }))
};

const ChangePlanStore = createContextStore<ChangePlanModel>(model, {
  disableImmer: true
});

export default ChangePlanStore;
