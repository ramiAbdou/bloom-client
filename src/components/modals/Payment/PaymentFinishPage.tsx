import React from 'react';

import Row from '@containers/Row/Row';
import { QueryResult } from '@hooks/useQuery.types';
import Form from '@organisms/Form/Form';
import StoryPage from '@organisms/Story/StoryPage';
import PaymentStore from './Payment.store';
import { GetChangePreviewResult, PaymentModalType } from './Payment.types';
import PaymentFinishButton from './PaymentFinishButton';
import PaymentFinishMethodInformationCard from './PaymentFinishMethodInformationCard';
import PaymentFinishPlanInformationCard from './PaymentFinishPlanInformationCard';
import useCreateSubscription from './useCreateSubscription';
import useInitChangePreview from './useInitChangePreview';

const PaymentFinishForm: React.FC = () => {
  const createSubscription = useCreateSubscription();

  return (
    <Form options={{ disableValidation: true }} onSubmit={createSubscription}>
      <Row className="mb-md--nlc" justify="sb" spacing="xs">
        <PaymentFinishPlanInformationCard />
        <PaymentFinishMethodInformationCard />
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
