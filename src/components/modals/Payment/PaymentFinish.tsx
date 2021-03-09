import deepequal from 'fast-deep-equal';
import React, { useEffect } from 'react';

import InformationCard from '@containers/Card/InformationCard';
import Row from '@containers/Row/Row';
import useManualQuery from '@hooks/useManualQuery';
import Form from '@organisms/Form/Form';
import StoryPage from '@organisms/Story/StoryPage';
import {
  IMemberPlan,
  IPaymentMethod,
  RecurrenceType
} from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/events';
import PaymentStore from './Payment.store';
import { GetChangePreviewArgs, GetChangePreviewResult } from './Payment.types';
import { getTypeDescription } from './Payment.util';
import PaymentFinishButton from './PaymentFinishButton';
import useCreateLifetimePayment from './useCreateLifetimePayment';
import useCreateSubscription from './useCreateSubscription';

const PaymentFinishForm: React.FC = () => {
  const planId = PaymentStore.useStoreState((state) => state.selectedPlanId);

  const { amount, isFree, name, recurrence }: IMemberPlan = useStoreState(
    ({ db }) => db.byMemberPlanId[planId],
    deepequal
  );

  const description = getTypeDescription({ amount, recurrence });

  const { brand, expirationDate, last4 }: IPaymentMethod = useStoreState(
    ({ db }) => db.memberIntegrations.paymentMethod,
    deepequal
  );

  const createSubscription = useCreateSubscription();
  const createLifetimePayment = useCreateLifetimePayment();

  const onSubmit =
    recurrence === RecurrenceType.LIFETIME
      ? createLifetimePayment
      : createSubscription;

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <Row className="mb-md--nlc" justify="sb" spacing="xs">
        <InformationCard description={description} title={name} />

        <InformationCard
          description={`Expires ${expirationDate}`}
          show={!!last4 && !isFree}
          title={`${brand} Ending in ${last4}`}
        />
      </Row>

      <PaymentFinishButton />
    </Form>
  );
};

const PaymentFinish: React.FC = () => {
  const planId = PaymentStore.useStoreState((state) => state.selectedPlanId);
  const modalType = PaymentStore.useStoreState((state) => state.type);

  const setChangeData = PaymentStore.useStoreActions(
    (store) => store.setChangeData
  );

  const [getChangePreview, { loading }] = useManualQuery<
    GetChangePreviewResult,
    GetChangePreviewArgs
  >({
    fields: ['amount', 'prorationDate'],
    operation: QueryEvent.GET_CHANGE_PREVIEW,
    types: { memberPlanId: { required: true } }
  });

  useEffect(() => {
    if (modalType !== 'CHANGE_MEMBERSHIP') return;

    (async () => {
      const { data } = await getChangePreview({ memberPlanId: planId });

      setChangeData({
        changeAmount: data?.amount,
        changeProrationDate: data?.prorationDate
      });
    })();
  }, [modalType, planId]);

  const title: string =
    modalType === 'PAY_DUES' ? 'Pay Dues' : 'Change Membership Plan';

  return (
    <StoryPage
      description="Please review this information to make sure we got everything right."
      id="FINISH"
      loading={loading}
      show={modalType !== 'UPDATE_PAYMENT_METHOD'}
      title={title}
    >
      <PaymentFinishForm />
    </StoryPage>
  );
};

export default PaymentFinish;
