import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { Schema } from '@store/Db/schema';
import PaymentStore from './Payment.store';
import { CreateLifetimePaymentArgs } from './Payment.types';

const useCreateLifetimePayment = () => {
  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);
  const pushToMembership = usePush('membership');

  const [createLifetimePayment] = useMutation<any, CreateLifetimePaymentArgs>({
    fields: [
      'amount',
      'createdAt',
      'id',
      { member: ['id', 'autoRenew', 'isDuesActive', { type: ['id'] }] }
    ],
    operation: 'createLifetimePayment',
    schema: Schema.MEMBER_PAYMENT,
    types: { memberTypeId: { required: true } }
  });

  const onSubmit = async ({ goForward, setError }: OnFormSubmitArgs) => {
    const { error } = await createLifetimePayment({ memberTypeId: typeId });

    if (error) {
      setError(error);
      return;
    }

    goForward();
    pushToMembership();
  };

  return typeId ? onSubmit : null;
};

export default useCreateLifetimePayment;
