import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { Schema } from '@store/schema';
import { CREATE_SINGLE_PAYMENT, CreateSinglePaymentArgs } from './Payment.gql';
import PaymentStore from './Payment.store';

const useCreateOneTimePayment = (): OnFormSubmit => {
  const setScreen = PaymentStore.useStoreActions((store) => store.setScreen);

  const memberTypeId = PaymentStore.useStoreState(
    (store) => store.selectedTypeId
  );

  const pushToMembership = usePush('membership');

  const [createSinglePayment] = useMutation<any, CreateSinglePaymentArgs>({
    name: 'createSinglePayment',
    query: CREATE_SINGLE_PAYMENT,
    schema: Schema.MEMBER
  });

  const onSubmit = async ({
    setErrorMessage,
    setIsLoading
  }: OnFormSubmitArgs) => {
    // Start the submit function by clearing the error message and set the
    // form state to loading.
    setErrorMessage(null);
    setIsLoading(true);

    const { error } = await createSinglePayment({ memberTypeId });
    setIsLoading(false);

    if (error) {
      setErrorMessage(error);
      return;
    }

    setScreen('CONFIRMATION');
    pushToMembership();
  };

  return onSubmit;
};

export default useCreateOneTimePayment;
