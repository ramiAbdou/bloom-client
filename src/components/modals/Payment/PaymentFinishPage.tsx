import deepequal from 'fast-deep-equal';
import React from 'react';

import InformationCard from '@containers/Card/InformationCard';
import Row from '@containers/Row/Row';
import { QueryResult } from '@hooks/useQuery.types';
import Form from '@organisms/Form/Form';
import StoryPage from '@organisms/Story/StoryPage';
import {
  IMemberPlan,
  IPaymentMethod,
  RecurrenceType
} from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import PaymentStore from './Payment.store';
import { GetChangePreviewResult, PaymentModalType } from './Payment.types';
import { getPlanDescription } from './Payment.util';
import PaymentFinishButton from './PaymentFinishButton';
import useCreateLifetimePayment from './useCreateLifetimePayment';
import useCreateSubscription from './useCreateSubscription';
import useInitChangePreview from './useInitChangePreview';

const PaymentFinishForm: React.FC = () => {
  const planId = PaymentStore.useStoreState((state) => state.selectedPlanId);

  const { amount, isFree, name, recurrence }: IMemberPlan = useStoreState(
    ({ db }) => db.byMemberPlanId[planId],
    deepequal
  );

  const description = getPlanDescription({ amount, recurrence });

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

const PaymentFinishPage: React.FC = () => {
  const modalType: PaymentModalType = PaymentStore.useStoreState((state) => {
    return state.type;
  });

  const {
    loading
  }: QueryResult<GetChangePreviewResult> = useInitChangePreview();

  return (
    <StoryPage
      description="Please review this information to make sure we got everything right."
      id="FINISH"
      loading={loading}
      show={modalType !== PaymentModalType.UPDATE_PAYMENT_METHOD}
      title={
        modalType === PaymentModalType.PAY_DUES
          ? 'Pay Dues'
          : 'Change Membership Plan'
      }
    >
      <PaymentFinishForm />
    </StoryPage>
  );
};

export default PaymentFinishPage;
