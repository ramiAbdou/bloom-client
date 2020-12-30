import { Action, action, createContextStore } from 'easy-peasy';

type DuesModel = {
  isTypeListOpen: boolean;
  selectedTypeId: string;
  setIsTypeListOpen: Action<DuesModel, boolean>;
  setMemberTypeId: Action<DuesModel, string>;
  toggleIsTypeListOpen: Action<DuesModel>;
};

export const duesModel: DuesModel = {
  isTypeListOpen: false,

  selectedTypeId: null,

  setIsTypeListOpen: action((state, isTypeListOpen: boolean) => ({
    ...state,
    isTypeListOpen
  })),

  setMemberTypeId: action((state, selectedTypeId: string) => ({
    ...state,
    selectedTypeId
  })),

  toggleIsTypeListOpen: action(({ isTypeListOpen, ...state }) => ({
    ...state,
    isTypeListOpen: !isTypeListOpen
  }))
};

export default createContextStore<DuesModel>((runtimeModel) => runtimeModel, {
  disableImmer: true
});
