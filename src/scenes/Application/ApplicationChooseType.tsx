import React, { useEffect } from 'react';

import { IdProps } from '@constants';
import usePrevious from '@hooks/usePrevious';
import { RadioOptionProps } from '@molecules/Radio/Radio.types';
import Form from '@organisms/Form/Form';
import FormStore from '@organisms/Form/Form.store';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryPage from '@organisms/Story/StoryPage';
import { IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import FormMultipleChoice from '../../components/organisms/Form/FormMultipleChoice';
import ApplicationPaymentSection from './ApplicationPaymentSection';

const ApplicationChooseTypeCard: React.FC<IdProps> = ({ id }) => {
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

const ApplicationChooseTypeButton: React.FC = () => {
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
    <FormSubmitButton disabled={disabled} show={!isPaidMembershipSelected}>
      Next: Confirmation
    </FormSubmitButton>
  );
};

const ApplicationChooseTypeContent: React.FC = () => {
  const types: RadioOptionProps[] = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;

    return db.community?.types?.map((typeId: string) => {
      const type: IMemberType = byTypeId[typeId];

      return {
        children: <ApplicationChooseTypeCard id={typeId} />,
        label: type.name
      };
    });
  });

  return (
    <Form>
      <FormMultipleChoice cardOptions={types} category="MEMBERSHIP_TYPE" />
      <ApplicationPaymentSection />
      <ApplicationChooseTypeButton />
    </Form>
  );
};

const ApplicationChooseType: React.FC = () => {
  const showForm: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;

    const types = db.community?.types;

    const isMoreThanOneType = types?.length > 1;
    const isFirstTypePaid = !!types && !byTypeId[types[0]]?.isFree;
    return isMoreThanOneType || isFirstTypePaid;
  });

  if (!showForm) return null;

  return (
    <StoryPage
      description="Choose your membership type."
      id="SELECT_TYPE"
      title="Membership Selection"
    >
      <ApplicationChooseTypeContent />
    </StoryPage>
  );
};

export default ApplicationChooseType;
