import day from 'dayjs';
import React, { useEffect } from 'react';

import Separator from '@atoms/Separator';
import Row from '@containers/Row/Row';
import useQuery from '@hooks/useQuery';
import FormStore from '@organisms/Form/Form.store';
import StoryPage from '@organisms/Story/StoryPage';
import { IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import InformationCard from '../../containers/Card/InformationCard';
import FormToggle from '../../organisms/Form/FormToggle';
import { GET_CHANGE_PREVIEW } from './Payment.gql';
import PaymentStore from './Payment.store';
import { getTypeDescription } from './Payment.util';
import PaymentFinishButton from './PaymentFinishButton';

const PaymentFinishToggle: React.FC = () => {
  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);

  const autoRenew = FormStore.useStoreState(
    ({ items }) => items.AUTO_RENEW?.value
  );

  const showToggle: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    const type: IMemberType = byTypeId[typeId];

    // Don't show toggle if auto renew was already enabled (which is the
    // default status) or if the type is free.
    return (
      !db.member.autoRenew && !type.isFree && type.recurrence !== 'LIFETIME'
    );
  });

  const nextPaymentMessage: string = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    const { recurrence }: IMemberType = byTypeId[typeId];

    if (autoRenew) {
      const nextPaymentDate = day().format('MMMM Do');
      return `Membership will auto-renew on ${nextPaymentDate} every year.`;
    }

    const nextPaymentDate = day()
      .add(1, recurrence === 'YEARLY' ? 'y' : 'month')
      .format('MMMM D, YYYY');

    return `Next payment will be due on ${nextPaymentDate}.`;
  });

  if (!showToggle) return null;

  return (
    <>
      <Separator margin={24} />

      <FormToggle
        value
        description={nextPaymentMessage}
        id="AUTO_RENEW"
        title="Auto-Renew Membership"
      />
    </>
  );
};

const PaymentFinishContent: React.FC = () => {
  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);

  const isFree: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return byTypeId[typeId]?.isFree;
  });

  const typeDescription: string = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return getTypeDescription(byTypeId[typeId]);
  });

  const selectedTypeName: string = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return byTypeId[typeId]?.name;
  });

  const brand = useStoreState(({ db }) => db.member.paymentMethod?.brand);
  const last4 = useStoreState(({ db }) => db.member.paymentMethod?.last4);

  const expirationDate = useStoreState(
    ({ db }) => db.member.paymentMethod?.expirationDate
  );

  return (
    <>
      <Row>
        <InformationCard
          description={typeDescription}
          title={selectedTypeName}
        />

        <InformationCard
          description={`Expires ${expirationDate}`}
          show={!!last4 && !isFree}
          title={`${brand} Ending in ${last4}`}
        />
      </Row>

      <PaymentFinishToggle />
      <PaymentFinishButton />
    </>
  );
};

const PaymentFinish: React.FC = () => {
  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);

  const setChangeData = PaymentStore.useStoreActions(
    (store) => store.setChangeData
  );

  const { data, loading } = useQuery({
    name: 'getChangePreview',
    query: GET_CHANGE_PREVIEW,
    variables: { memberTypeId: typeId }
  });

  useEffect(() => {
    if (data) {
      setChangeData({
        changeAmount: data?.amount,
        changeProrationDate: data?.prorationDate
      });
    }
  }, [data]);

  return (
    <StoryPage id="FINISH" loading={loading}>
      <PaymentFinishContent />
    </StoryPage>
  );
};

export default PaymentFinish;
