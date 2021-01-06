import LoadingStore from '@store/Loading.store';
import { useStoreState } from '@store/Store';
import PaymentStore from './Payment.store';

/**
 * Returns the screen that the payment modal should be on depending on the
 * type of the Modal and the progression of the user.
 */
const useInitPaymentScreen = () => {
  const isCardOnFile: boolean = useStoreState(({ db }) => {
    const { paymentMethod } = db.member;
    return !!paymentMethod?.brand && !!paymentMethod?.last4;
  });

  const loading = LoadingStore.useStoreState((store) => store.loading);
  const screen = PaymentStore.useStoreState((store) => store.screen);
  const type = PaymentStore.useStoreState((store) => store.type);
  const setScreen = PaymentStore.useStoreActions((store) => store.setScreen);

  const setBackButton = PaymentStore.useStoreActions(
    (store) => store.setBackButton
  );

  // If the screen was already set, don't set it again.
  if (loading || screen) return;

  if (!isCardOnFile) setBackButton(true);
  if (type === 'UPDATE_PAYMENT_METHOD' || !isCardOnFile) setScreen('CARD_FORM');
  else setScreen('FINISH');
};

export default useInitPaymentScreen;
