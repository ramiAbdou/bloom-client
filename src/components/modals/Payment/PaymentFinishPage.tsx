import React from 'react';

import Row from '@containers/Row/Row';
import { QueryResult } from '@hooks/useQuery.types';
import Form from '@organisms/Form/Form';
import { OnFormSubmitFunction } from '@organisms/Form/Form.types';
import StoryPage from '@organisms/Story/StoryPage';
import PaymentStore from './Payment.store';
import { GetChangePreviewResult, PaymentModalType } from './Payment.types';
import PaymentFinishButton from './PaymentFinishButton';
import PaymentFinishMemberTypeInformationCard from './PaymentFinishMemberTypeInformationCard';
import PaymentFinishMethodInformationCard from './PaymentFinishMethodInformationCard';
import useInitChangePreview from './useInitChangePreview';
import useUpdateStripeSubscriptionId from './useUpdateStripeSubscriptionId';

const PaymentFinishForm: React.FC = () => {
  const prorationDate: number = PaymentStore.useStoreState(
    (state) => state.changeProrationDate
  );

  const updateStripeSubscriptionId: OnFormSubmitFunction = useUpdateStripeSubscriptionId();

  return (
    <Form
      options={{ disableValidation: true }}
      onSubmit={updateStripeSubscriptionId}
      onSubmitDeps={[prorationDate]}
    >
      <Row className="mb-md--nlc" justify="sb" spacing="xs">
        <PaymentFinishMemberTypeInformationCard />
        <PaymentFinishMethodInformationCard />
      </Row>

      <PaymentFinishButton />
    </Form>
  );
};

const PaymentFinishPage: React.FC = () => {
  const modalType: PaymentModalType = PaymentStore.useStoreState(
    (state) => state.type
  );

  const {
    loading
  }: QueryResult<GetChangePreviewResult> = useInitChangePreview();

  const description =
    'Please review this information to make sure we got everything right.';

  return (
    <StoryPage
      description={description}
      id="FINISH"
      loading={loading}
      show={modalType !== PaymentModalType.UPDATE_PAYMENT_METHOD}
      title={
        modalType === PaymentModalType.PAY_DUES
          ? 'Pay Dues'
          : 'Change Membership Type'
      }
    >
      <PaymentFinishForm />
    </StoryPage>
  );
};

export default PaymentFinishPage;
