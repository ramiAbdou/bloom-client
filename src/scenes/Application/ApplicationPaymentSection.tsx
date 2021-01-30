import React from 'react';

import Separator from '@atoms/Separator';
import Row from '@containers/Row/Row';
import PaymentStripeProvider from '@modals/Payment/PaymentStripeProvider';
import FormStore from '@organisms/Form/Form.store';
import FormItem from '@organisms/Form/FormItem';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';

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
      <FormShortText title="Name on Card" />

      <FormItem
        value
        category="CREDIT_OR_DEBIT_CARD"
        title="Credit or Debit Card"
      >
        <CardElement options={options} />
      </FormItem>

      <FormShortText title="Billing Address" />

      <Row spaceBetween className="mo-payment-billing-ctr">
        <FormShortText placeholder="Los Angeles" title="City" />
        <FormShortText placeholder="CA" title="State" />
        <FormShortText placeholder="00000" title="Zip Code" />
      </Row>
    </>
  );
};

const ApplicationPaymentSectionContent: React.FC = () => {
  const selectedTypeName: string = FormStore.useStoreState(({ getItem }) => {
    return getItem({ category: 'MEMBERSHIP_TYPE' })?.value;
  });

  const isPaidMembershipSelected: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;

    const selectedType: IMemberType = db.community?.types
      ?.map((typeId: string) => byTypeId[typeId])
      ?.find((type: IMemberType) => type?.name === selectedTypeName);

    return !!selectedType?.amount;
  });

  const elements = useElements();
  const stripe = useStripe();

  const city = FormStore.useStoreState(({ getItem }) => {
    return getItem({ title: 'City' })?.value;
  });

  const state = FormStore.useStoreState(({ getItem }) => {
    return getItem({ title: 'State' })?.value;
  });

  const postalCode = FormStore.useStoreState(({ getItem }) => {
    return getItem({ title: 'Zip Code' })?.value;
  });

  const nameOnCard = FormStore.useStoreState(({ getItem }) => {
    return getItem({ title: 'Name on Card' })?.value;
  });

  const disabled: boolean = FormStore.useStoreState(({ getItem }) => {
    const isTypeSelected = !!getItem({ category: 'MEMBERSHIP_TYPE' })?.value;
    return !isTypeSelected;
  });

  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  const onContinue = async () => {
    // Create the payment method via the Stripe SDK.
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      billing_details: {
        address: { city, postal_code: postalCode, state },
        name: nameOnCard
      },
      card: elements.getElement(CardElement),
      type: 'card'
    });

    if (error) return;

    const brand = paymentMethod?.card?.brand;
    const last4 = paymentMethod?.card?.last4;
    const expirationMonth = paymentMethod?.card?.exp_month;
    const expirationYear = paymentMethod?.card?.exp_year;

    updateItem({
      category: 'CREDIT_OR_DEBIT_CARD',
      value: {
        brand: brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase(),
        expirationDate: `${expirationMonth}/${expirationYear}`,
        last4
      }
    });
  };

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

        <PaymentCardForm />
      </div>

      <FormSubmitButton disabled={disabled} onClick={onContinue}>
        Next: Confirmation
      </FormSubmitButton>
    </>
  );
};

const ApplicationPaymentSection: React.FC = () => {
  const selectedTypeName: string = FormStore.useStoreState(({ getItem }) => {
    return getItem({ category: 'MEMBERSHIP_TYPE' })?.value;
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
    <PaymentStripeProvider>
      <ApplicationPaymentSectionContent />
    </PaymentStripeProvider>
  );
};

export default ApplicationPaymentSection;
