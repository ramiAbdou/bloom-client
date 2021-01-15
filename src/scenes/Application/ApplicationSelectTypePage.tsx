import React from 'react';

import { IdProps } from '@constants';
import FormStore from '@organisms/Form/Form.store';
import FormItem from '@organisms/Form/FormItem';
import FormPage from '@organisms/Form/FormPage';
import { IMemberType } from '@store/entities';
import { useStoreState } from '@store/Store';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { takeFirst } from '@util/util';
import { RadioOptionProps } from '../../components/molecules/Radio/Radio.types';
import FormContinueButton from '../../components/organisms/Form/FormContinueButton';
import ApplicationPaymentSection from './ApplicationPaymentSection';

const ApplicationSelectTypeCardContent: React.FC<IdProps> = ({ id }) => {
  const amount = useStoreState(({ db }) => {
    return db.entities.types.byId[id]?.amount;
  });

  const recurrence = useStoreState(({ db }) => {
    return db.entities.types.byId[id]?.recurrence;
  });

  if (amount === undefined || recurrence === undefined) return null;

  // Formats the amount with FREE if the amount is 0.
  const amountString = amount ? `$${amount / 100}` : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString = takeFirst([
    [recurrence === 'YEARLY', 'Per Year'],
    [recurrence === 'MONTHLY', 'Per Month'],
    [recurrence === 'LIFETIME', 'Lifetime']
  ]);

  return (
    <p className="s-application-type-string">
      <span>{amountString}</span>
      <span>{recurrenceString}</span>
    </p>
  );
};

const ApplicationSelectTypePage: React.FC = () => {
  const cardOptions: RadioOptionProps[] = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;

    return db.community?.types?.map((typeId: string) => {
      const type: IMemberType = byTypeId[typeId];

      return {
        children: <ApplicationSelectTypeCardContent id={typeId} />,
        label: type.name
      };
    });
  });

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

  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  const disabled: boolean = FormStore.useStoreState(({ getItem }) => {
    const isTypeSelected = !!getItem({ category: 'MEMBERSHIP_TYPE' })?.value;
    return !isTypeSelected;
  });

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

  const onContinue = async () => {
    if (!isPaidMembershipSelected) return;

    // Create the payment method via the Stripe SDK.
    const stripeResult = await stripe.createPaymentMethod({
      billing_details: {
        address: { city, postal_code: postalCode, state },
        name: nameOnCard
      },
      card: elements.getElement(CardElement),
      type: 'card'
    });

    if (!stripeResult.error) {
      updateItem({
        category: 'CREDIT_OR_DEBIT_CARD',
        value: stripeResult.paymentMethod?.id
      });
    }
  };

  return (
    <FormPage id="SELECT_TYPE">
      <FormItem
        card
        cardOptions={cardOptions}
        category="MEMBERSHIP_TYPE"
        page="SELECT_TYPE"
        type="MULTIPLE_CHOICE"
      />

      <ApplicationPaymentSection />

      <FormContinueButton disabled={disabled} onClick={onContinue}>
        Next: Confirmation
      </FormContinueButton>
    </FormPage>
  );
};

export default ApplicationSelectTypePage;
