import React from 'react';

// import React, { useEffect } from 'react';
// import usePrevious from '@hooks/usePrevious';
import { RadioOptionProps } from '@molecules/Radio/Radio.types';
import Form from '@organisms/Form/Form';
import FormStore from '@organisms/Form/Form.store';
import FormMultipleChoice from '@organisms/Form/FormMultipleChoice';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryPage from '@organisms/Story/StoryPage';
import { IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import ApplicationChooseTypeCard from './ApplicationChooseTypeCard';
import ApplicationPaymentForm from './ApplicationPaymentSection';

const ApplicationChooseTypeButton: React.FC = () => {
  const selectedTypeName: string = FormStore.useStoreState(({ items }) => {
    return items.MEMBERSHIP_TYPE?.value;
  });

  // const removeItems = FormStore.useStoreActions((store) => store.removeItems);

  const isPaidMembershipSelected: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;

    const selectedType: IMemberType = db.community?.types
      ?.map((typeId: string) => byTypeId[typeId])
      ?.find((type: IMemberType) => type?.name === selectedTypeName);

    return !!selectedType?.amount;
  });

  // const wasPaidMembershipSelected = usePrevious(isPaidMembershipSelected);

  // useEffect(() => {
  //   if (wasPaidMembershipSelected && !isPaidMembershipSelected) {
  //     removeItems([
  //       { title: 'Name on Card' },
  //       { category: 'CREDIT_OR_DEBIT_CARD' },
  //       { title: 'Billing Address' },
  //       { title: 'City' },
  //       { title: 'State' },
  //       { title: 'Zip Code' }
  //     ]);
  //   }
  // }, [isPaidMembershipSelected]);

  return (
    <FormSubmitButton show={!isPaidMembershipSelected}>
      Next: Confirmation
    </FormSubmitButton>
  );
};

const ApplicationChooseTypeForm: React.FC = () => {
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

  // const syncStory = useSyncStory();

  return (
    <Form>
      <FormMultipleChoice cardOptions={types} category="MEMBERSHIP_TYPE" />
      <ApplicationChooseTypeButton />
    </Form>
  );
};

const ApplicationChooseType: React.FC = () => {
  const show: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;

    const types = db.community?.types;

    const isMoreThanOneType = types?.length > 1;
    const isFirstTypePaid = !!types && !byTypeId[types[0]]?.isFree;
    return isMoreThanOneType || isFirstTypePaid;
  });

  return (
    <StoryPage
      description="Choose your membership type."
      id="SELECT_TYPE"
      show={!!show}
      title="Membership Selection"
    >
      <ApplicationChooseTypeForm />
      <ApplicationPaymentForm />
    </StoryPage>
  );
};

export default ApplicationChooseType;
