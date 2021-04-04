import { useHistory } from 'react-router-dom';

import useBloomMutation from '@gql/useBloomMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { IMemberIntegrations } from '@store/Db/Db.entities';
import { Schema } from '@store/Db/Db.schema';
import { useStoreState } from '@store/Store';
import { MutationEvent } from '@util/constants.events';
import PaymentStore from './Payment.store';
import { CreateSubscriptionArgs } from './Payment.types';

const useUpdateStripeSubscriptionId = (): OnFormSubmitFunction => {
  const urlName: string = useStoreState(({ db }) => db.community?.urlName);

  const selectedMemberTypeId: string = PaymentStore.useStoreState(
    (state) => state.selectedMemberTypeId
  );

  const prorationDate: number = PaymentStore.useStoreState(
    (state) => state.changeProrationDate
  );

  const { push } = useHistory();

  const [updateStripeSubscriptionId] = useBloomMutation<
    IMemberIntegrations,
    CreateSubscriptionArgs
  >({
    fields: [
      'id',
      'stripeSubscriptionId',
      { member: ['id', 'isDuesActive', { memberType: ['id'] }] }
    ],
    operation: MutationEvent.UPDATE_STRIPE_SUBSCRIPTION_ID,
    schema: Schema.MEMBER_INTEGRATIONS,
    types: {
      memberTypeId: { required: true },
      prorationDate: { required: false, type: 'Int' }
    }
  });

  const onSubmit: OnFormSubmitFunction = async (args: OnFormSubmitArgs) => {
    const { error } = await updateStripeSubscriptionId({
      memberTypeId: selectedMemberTypeId,
      prorationDate
    });

    if (error) {
      args.setError(error);
      return;
    }

    args.goForward();

    // Redirect to the /membership page after a timeout of 2.5 seconds. The
    // reason we want this timeout is so that we can give our backend a little
    // bit of time to capture the Stripe webhook and create the payment so
    // we can display it in the MembershipPaymentTable.
    setTimeout(() => {
      push(`/${urlName}/membership`);
    }, 2500);
  };

  return onSubmit;
};

export default useUpdateStripeSubscriptionId;
