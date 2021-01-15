import React from 'react';

import Separator from '@atoms/Separator';
import Row from '@containers/Row/Row';
import FormStore from '@organisms/Form/Form.store';
import FormItem from '@organisms/Form/FormItem';
import { IMemberType } from '@store/entities';
import { useStoreState } from '@store/Store';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import PaymentStripeProvider from '../../components/modals/Payment/PaymentStripeProvider';

const options: StripeCardElementOptions = {
  classes: {
    base: 'c-misc-input',
    empty: 'c-misc-input',
    focus: 'c-misc-input--focus',
    invalid: 'c-misc-input--error'
  },
  hidePostalCode: true,
  iconStyle: 'solid',
  style: { base: { fontFamily: 'Muli', fontSize: '15px', fontWeight: '700' } }
};

const PaymentCardForm: React.FC = () => {
  return (
    <>
      <FormItem
        required
        page="SELECT_TYPE"
        title="Name on Card"
        type="SHORT_TEXT"
      />

      <FormItem required value page="SELECT_TYPE" title="Credit or Debit Card">
        <CardElement options={options} />
      </FormItem>

      <FormItem
        required
        page="SELECT_TYPE"
        title="Billing Address"
        type="SHORT_TEXT"
      />

      <Row spaceBetween className="mo-payment-billing-ctr">
        <FormItem
          required
          page="SELECT_TYPE"
          placeholder="Los Angeles"
          title="City"
          type="SHORT_TEXT"
        />

        <FormItem
          required
          page="SELECT_TYPE"
          placeholder="CA"
          title="State"
          type="SHORT_TEXT"
        />

        <FormItem
          required
          page="SELECT_TYPE"
          placeholder="00000"
          title="Zip Code"
          type="SHORT_TEXT"
        />
      </Row>
    </>
  );
};

const ApplicationPaymentSection: React.FC = () => {
  const selectedTypeName: string = FormStore.useStoreState(({ getItem }) => {
    return getItem({ id: 'selectType' })?.value;
  });

  const isPaidMembershipSelected: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;

    const selectedType: IMemberType = db.community?.types
      ?.map((typeId: string) => byTypeId[typeId])
      ?.find((type: IMemberType) => type?.name === selectedTypeName);

    return !!selectedType?.amount;
  });

  if (!isPaidMembershipSelected) return null;

  return (
    <>
      <Separator margin={24} />

      <div className="s-application-payment-ctr">
        <h2>Payment</h2>

        <p>
          You selected a paid plan. Please enter your card and billing
          information to continue. You will be able to review this information
          in the next step.
        </p>

        <PaymentStripeProvider>
          <PaymentCardForm />
        </PaymentStripeProvider>
      </div>
    </>
  );
};

export default ApplicationPaymentSection;
