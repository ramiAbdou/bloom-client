import { Action, action, createContextStore } from 'easy-peasy';

type DuesModel = {
  isTypeListOpen: boolean;
  memberTypeId: string;
  setIsTypeListOpen: Action<DuesModel, boolean>;
  setMemberTypeId: Action<DuesModel, string>;
  toggleIsTypeListOpen: Action<DuesModel>;
};

export default createContextStore<DuesModel>(
  {
    isTypeListOpen: false,

    memberTypeId: null,

    setIsTypeListOpen: action((state, isTypeListOpen: boolean) => ({
      ...state,
      isTypeListOpen
    })),

    setMemberTypeId: action((state, memberTypeId: string) => ({
      ...state,
      memberTypeId
    })),

    toggleIsTypeListOpen: action(({ isTypeListOpen, ...state }) => ({
      ...state,
      isTypeListOpen: !isTypeListOpen
    }))
  },
  { disableImmer: true }
);
