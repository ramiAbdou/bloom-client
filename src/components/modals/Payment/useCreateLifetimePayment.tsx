import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { Schema } from '@store/Db/schema';
import {
  CREATE_LIFETIME_PAYMENT,
  CreateLifetimePaymentArgs
} from './Payment.gql';
import PaymentStore from './Payment.store';

const useCreateLifetimePayment = (): OnFormSubmit => {
  const memberTypeId = PaymentStore.useStoreState(
    (store) => store.selectedTypeId
  );

  const pushToMembership = usePush('membership');

  const [createSinglePayment] = useMutation<any, CreateLifetimePaymentArgs>({
    name: 'createLifetimePayment',
    query: CREATE_LIFETIME_PAYMENT,
    schema: Schema.MEMBER
  });

  const onSubmit = async ({ goForward, setError }: OnFormSubmitArgs) => {
    const { error } = await createSinglePayment({ memberTypeId });

    if (error) {
      setError(error);
      return;
    }

    goForward();
    pushToMembership();
  };

  return memberTypeId ? onSubmit : null;
};

export default useCreateLifetimePayment;
