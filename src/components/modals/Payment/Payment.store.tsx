import { Action, action, createContextStore } from 'easy-peasy';

import { PaymentModalScreen, PaymentModalType } from './Payment.types';

export type PaymentModel = {
  screen: PaymentModalScreen;
  selectedTypeId: string;
  setScreen: Action<PaymentModel, PaymentModalScreen>;
  showAutoRenewOption: boolean;
  type: PaymentModalType;
};

export const paymentModel: PaymentModel = {
  screen: null,
  selectedTypeId: null,
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
