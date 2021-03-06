import React from 'react';

import Separator from '@atoms/Separator';
import Row from '@containers/Row/Row';
import Show from '@containers/Show';
import PaymentStripeProvider from '@modals/Payment/PaymentStripeProvider';
import Form from '@organisms/Form/Form';
import FormCreditCard from '@organisms/Form/FormCreditCard';
import FormHeader from '@organisms/Form/FormHeader';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryStore from '@organisms/Story/Story.store';
import { IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
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
  const selectedTypeName: string = StoryStore.useStoreState(
    ({ items }) => items.MEMBER_TYPE?.value as string
  );

  const isPaidMembershipSelected: boolean = useStoreState(({ db }) => {
    const selectedType: IMemberType = db.community?.memberTypes
      ?.map((memberTypeId: string) => db.byMemberTypeId[memberTypeId])
      ?.find((type: IMemberType) => type?.name === selectedTypeName);

    return !!selectedType?.amount;
  });

  return (
    <Show show={!!isPaidMembershipSelected}>
      <Separator margin={24} />

      <PaymentStripeProvider>
        <ApplicationPaymentForm />
      </PaymentStripeProvider>
    </Show>
  );
};

export default ApplicationPaymentSection;
