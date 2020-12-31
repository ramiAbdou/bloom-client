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

export default createContextStore<ChangePlanModel>(model, {
  disableImmer: true
});
