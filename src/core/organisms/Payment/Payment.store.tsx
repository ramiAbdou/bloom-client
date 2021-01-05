import { Action, action } from 'easy-peasy';

export type PaymentModel = {
  isCardChanging: boolean;
  selectedTypeId: string;
  setIsChangingCard: Action<PaymentModel, boolean>;
  setSelectedTypeId: Action<PaymentModel, string>;
};

export const paymentModel: PaymentModel = {
  isCardChanging: false,

  selectedTypeId: null,

  setIsChangingCard: action((state, isCardChanging: boolean) => ({
    ...state,
    isCardChanging
  })),

  setSelectedTypeId: action((state, selectedTypeId: string) => ({
    ...state,
    selectedTypeId
  }))
};
