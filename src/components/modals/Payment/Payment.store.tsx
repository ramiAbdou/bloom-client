import { Action, action, createContextStore } from 'easy-peasy';

import { PaymentModalScreen, PaymentModalType } from './Payment.types';

export type PaymentModel = {
  backButton: boolean;
  screen: PaymentModalScreen;
  selectedTypeId: string;
  setBackButton: Action<PaymentModel, boolean>;
  setScreen: Action<PaymentModel, PaymentModalScreen>;
  showAutoRenewOption: boolean;
  type: PaymentModalType;
};

export const paymentModel: PaymentModel = {
  backButton: false,
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
  showAutoRenewOption: false,
  type: 'PAY_DUES'
};

const PaymentStore = createContextStore<PaymentModel>(
  (runtimeModel: PaymentModel) => runtimeModel,
  { disableImmer: true }
);

export default PaymentStore;
