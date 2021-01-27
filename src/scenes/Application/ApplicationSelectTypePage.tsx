import React, { useEffect } from 'react';

import { IdProps } from '@constants';
import usePrevious from '@hooks/usePrevious';
import FormStore from '@organisms/Form/Form.store';
import FormItem from '@organisms/Form/FormItem';
import FormPage from '@organisms/Form/FormPage';
import { IMemberType } from '@store/entities';
import { useStoreState } from '@store/Store';
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

  const disabled: boolean = FormStore.useStoreState(({ getItem }) => {
    const isTypeSelected = !!getItem({ category: 'MEMBERSHIP_TYPE' })?.value;
    return !isTypeSelected;
  });

  const selectedTypeName: string = FormStore.useStoreState(({ getItem }) => {
    return getItem({ category: 'MEMBERSHIP_TYPE' })?.value;
  });

  const removeItems = FormStore.useStoreActions((store) => store.removeItems);

  const isPaidMembershipSelected: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;

    const selectedType: IMemberType = db.community?.types
      ?.map((typeId: string) => byTypeId[typeId])
      ?.find((type: IMemberType) => type?.name === selectedTypeName);

    return !!selectedType?.amount;
  });

  const wasPaidMembershipSelected = usePrevious(isPaidMembershipSelected);

  useEffect(() => {
    if (wasPaidMembershipSelected && !isPaidMembershipSelected) {
      removeItems([
        { title: 'Name on Card' },
        { category: 'CREDIT_OR_DEBIT_CARD' },
        { title: 'Billing Address' },
        { title: 'City' },
        { title: 'State' },
        { title: 'Zip Code' }
      ]);
    }
  }, [isPaidMembershipSelected]);

  return (
    <FormPage id="SELECT_TYPE">
      <FormItem
        cardOptions={cardOptions}
        category="MEMBERSHIP_TYPE"
        pageId="SELECT_TYPE"
        type="MULTIPLE_CHOICE"
      />

      <ApplicationPaymentSection />

      {!isPaidMembershipSelected && (
        <FormContinueButton disabled={disabled}>
          Next: Confirmation
        </FormContinueButton>
      )}
    </FormPage>
  );
};

export default ApplicationSelectTypePage;
