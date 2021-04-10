import React from 'react';

import Separator from '@components/atoms/Separator';
import Row from '@components/containers/Row/Row';
import Show from '@components/containers/Show';
// import PaymentStripeProvider from '@components/modals/Payment/PaymentStripeProvider';
import Form from '@components/organisms/Form/Form';
import FormCreditCard from '@components/organisms/Form/FormCreditCard';
import FormHeader from '@components/organisms/Form/FormHeader';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import StoryStore from '@components/organisms/Story/Story.store';
import { IMemberType } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import useSavePaymentMethod from './useSavePaymentMethod';

const ApplicationPaymentForm: React.FC = () => {
  const savePaymentMethod = useSavePaymentMethod();

  return (
    <Form onSubmit={savePaymentMethod}>
      <FormHeader
        h2
        description="You selected a paid type. Please enter your card and billing information to continue. You will be able to review this information in the next step."
        title="Payment"
      />

      <FormShortText id="NAME_ON_CARD" title="Name on Card" />
      <FormCreditCard />
      <FormShortText id="BILLING_ADDRESS" title="Billing Address" />

      <Row className="mo-payment-billing-ctr" justify="sb" spacing="xs">
        <FormShortText id="CITY" placeholder="Los Angeles" title="City" />
        <FormShortText id="STATE" placeholder="CA" title="State" />
        <FormShortText id="ZIP_CODE" placeholder="00000" title="Zip Code" />
      </Row>

      <FormSubmitButton>Next: Confirmation</FormSubmitButton>
    </Form>
  );
};

const ApplicationPaymentSection: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const selectedTypeName: string = StoryStore.useStoreState(
    ({ items }) => items.MEMBER_TYPE?.value as string
  );

  const isPaidMembershipSelected: boolean = !!useFindOne(IMemberType, {
    where: { amount: { _gt: 0 }, communityId, name: selectedTypeName }
  });

  return (
    <Show show={!!isPaidMembershipSelected}>
      <Separator margin={24} />

      {/* <PaymentStripeProvider> */}
      <ApplicationPaymentForm />
      {/* </PaymentStripeProvider> */}
    </Show>
  );
};

export default ApplicationPaymentSection;
