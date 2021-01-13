import { Action, action, createContextStore } from 'easy-peasy';

import { PaymentModalScreen, PaymentModalType } from './Payment.types';

export type PaymentModel = {
  backButton: boolean;
  clearOptions: Action<PaymentModel>;
  screen: PaymentModalScreen;
  selectedTypeId: string;
  setBackButton: Action<PaymentModel, boolean>;
  setScreen: Action<PaymentModel, PaymentModalScreen>;
  setSelectedTypeId: Action<PaymentModel, string>;
  type: PaymentModalType;
};

export const paymentModel: PaymentModel = {
  backButton: false,

  clearOptions: action((store) => ({
    ...store,
    screen: null,
    selectedTypeId: null
  })),

  screen: null,

  selectedTypeId: null,

  setBackButton: action((store, backButton: boolean) => ({
    ...store,
    backButton
  })),

  setScreen: action((store, screen: PaymentModalScreen) => ({
    ...store,
    screen
  })),

  setSelectedTypeId: action((store, selectedTypeId: string) => ({
    ...store,
    selectedTypeId
  })),

  type: 'PAY_DUES'
};

const PaymentStore = createContextStore<PaymentModel>(
  (runtimeModel: PaymentModel) => runtimeModel,
  { disableImmer: true }
);

export default PaymentStore;
