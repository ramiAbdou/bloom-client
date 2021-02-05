import deline from 'deline';
import deepequal from 'fast-deep-equal';
import React, { useEffect } from 'react';

import InformationCard from '@containers/Card/InformationCard';
import Row from '@containers/Row/Row';
import useManualQuery from '@hooks/useManualQuery';
import Form from '@organisms/Form/Form';
import StoryPage from '@organisms/Story/StoryPage';
import { IMemberType, IPaymentMethod } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import {
  GET_CHANGE_PREVIEW,
  GetChangePreviewArgs,
  GetChangePreviewResult
} from './Payment.gql';
import PaymentStore from './Payment.store';
import { getTypeDescription } from './Payment.util';
import PaymentFinishButton from './PaymentFinishButton';
import PaymentFinishToggle from './PaymentFinishToggle';
import useCreateLifetimePayment from './useCreateLifetimePayment';
import useCreateSubscription from './useCreateSubscription';

const PaymentFinishForm: React.FC = () => {
  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);

  const { amount, isFree, name, recurrence }: IMemberType = useStoreState(
    ({ db }) => db.byTypeId[typeId],
    deepequal
  );

  const description = getTypeDescription({ amount, recurrence });

  const { brand, expirationDate, last4 }: IPaymentMethod = useStoreState(
    ({ db }) => db.member.paymentMethod,
    deepequal
  );

  const createSubscription = useCreateSubscription();
  const createLifetimePayment = useCreateLifetimePayment();

  const onSubmit =
    recurrence === 'LIFETIME' ? createLifetimePayment : createSubscription;

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <Row spaceBetween marginBottom={24} spacing="xs">
        <InformationCard description={description} title={name} />

        <InformationCard
          description={`Expires ${expirationDate}`}
          show={!!last4 && !isFree}
          title={`${brand} Ending in ${last4}`}
        />
      </Row>

      <PaymentFinishToggle />
      <PaymentFinishButton />
    </Form>
  );
};

const PaymentFinish: React.FC = () => {
  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);
  const modalType = PaymentStore.useStoreState((store) => store.type);

  const setChangeData = PaymentStore.useStoreActions(
    (store) => store.setChangeData
  );

  const [getChangePreview, { loading }] = useManualQuery<
    GetChangePreviewResult,
    GetChangePreviewArgs
  >({
    name: 'getChangePreview',
    query: GET_CHANGE_PREVIEW
  });

  useEffect(() => {
    if (modalType !== 'CHANGE_MEMBERSHIP') return;

    (async () => {
      const { data } = await getChangePreview({ memberTypeId: typeId });

      setChangeData({
        changeAmount: data?.amount,
        changeProrationDate: data?.prorationDate
      });
    })();
  }, [modalType, typeId]);

  const title: string =
    modalType === 'PAY_DUES' ? 'Pay Dues' : 'Change Membership Plan';

  const description: string = deline`
    Please review this information to make sure we got everything right.
  `;

  return (
    <StoryPage
      description={description}
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
