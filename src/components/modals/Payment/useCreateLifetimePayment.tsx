import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { Schema } from '@store/Db/schema';
import PaymentStore from './Payment.store';
import { CreateLifetimePaymentArgs } from './Payment.types';

const useCreateLifetimePayment = (): OnFormSubmit => {
  const memberTypeId = PaymentStore.useStoreState(
    (store) => store.selectedTypeId
  );

  const pushToMembership = usePush('membership');

  const [createSinglePayment] = useMutation<any, CreateLifetimePaymentArgs>({
    fields: [
      'amount',
      'createdAt',
      'id',
      { member: ['id', 'autoRenew', 'isDuesActive', { type: ['id', 'name'] }] }
    ],
    operation: 'createLifetimePayment',
    schema: Schema.MEMBER_PAYMENT,
    types: { memberTypeId: { required: true } }
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
