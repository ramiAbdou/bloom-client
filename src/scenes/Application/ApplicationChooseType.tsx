import React from 'react';

import { QuestionCategory } from '@constants';
import { RadioOptionProps } from '@molecules/Radio/Radio.types';
import Form from '@organisms/Form/Form';
import FormStore from '@organisms/Form/Form.store';
import FormMultipleChoice from '@organisms/Form/FormMultipleChoice';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import { IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import ApplicationChooseTypeCard from './ApplicationChooseTypeCard';
import ApplicationPaymentForm from './ApplicationPaymentSection';

const ApplicationChooseTypeButton: React.FC = () => {
  const selectedTypeName: string = FormStore.useStoreState(({ items }) => {
    return items.MEMBERSHIP_TYPE?.value;
  });

  const isPaidMembershipSelected: boolean = useStoreState(({ db }) => {
    const selectedType: IMemberType = db.community?.types
      ?.map((typeId: string) => db.byTypeId[typeId])
      ?.find((type: IMemberType) => type?.name === selectedTypeName);

    return !!selectedType?.amount;
  });

  return (
    <FormSubmitButton show={!isPaidMembershipSelected}>
      Next: Confirmation
    </FormSubmitButton>
  );
};

const ApplicationChooseTypeForm: React.FC = () => {
  const types: RadioOptionProps[] = useStoreState(({ db }) => {
    return db.community?.types?.map((typeId: string) => {
      const type: IMemberType = db.byTypeId[typeId];

      return {
        children: <ApplicationChooseTypeCard id={typeId} />,
        label: type.name
      };
    });
  });

  const goForward = StoryStore.useStoreActions((state) => state.goForward);
  const onSubmit = async () => goForward();

  return (
    <Form onSubmit={onSubmit}>
      <FormMultipleChoice
        cardOptions={types}
        category={QuestionCategory.MEMBERSHIP_TYPE}
      />
      <ApplicationChooseTypeButton />
    </Form>
  );
};

const ApplicationChooseType: React.FC = () => {
  const isMultipleTypesOrPaid: boolean = useStoreState(({ db }) => {
    const types: string[] = db.community?.types;

    if (!types || (types && types.length <= 1)) return false;

    return types.some((typeId: string) => {
      const type: IMemberType = db.byTypeId[typeId];
      return !!type?.amount;
    });
  });

  return (
    <StoryPage
      description="Choose your membership type."
      id="SELECT_TYPE"
      show={!!isMultipleTypesOrPaid}
      title="Membership Selection"
    >
      <ApplicationChooseTypeForm />
      <ApplicationPaymentForm />
    </StoryPage>
  );
};

export default ApplicationChooseType;
