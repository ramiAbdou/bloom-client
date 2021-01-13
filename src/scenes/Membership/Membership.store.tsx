import { Action, action, createContextStore } from 'easy-peasy';

type MembershipModel = {
  selectedTypeId: string;
  setSelectedTypeId: Action<MembershipModel, string>;
};

const model: MembershipModel = {
  selectedTypeId: null,

  setSelectedTypeId: action((state, selectedTypeId: string) => ({
    ...state,
    selectedTypeId
  }))
};

const MembershipStore = createContextStore<MembershipModel>(model, {
  disableImmer: true
});

export default MembershipStore;
