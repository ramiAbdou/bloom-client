import React from 'react';

import { RadioOptionProps } from '@molecules/Radio/Radio.types';
import Form from '@organisms/Form/Form';
import FormStore from '@organisms/Form/Form.store';
import FormMultipleChoice from '@organisms/Form/FormMultipleChoice';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import { IMemberType } from '@db/db.entities';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';
import ApplicationChooseTypeCard from './ApplicationChooseTypeCard';
import ApplicationPaymentForm from './ApplicationPaymentSection';

const ApplicationChooseTypeButton: React.FC = () => {
  const selectedTypeName: string = FormStore.useStoreState(
    ({ items }) => items.MEMBER_TYPE?.value as string
  );

  const isPaidMembershipSelected: boolean = useStoreState(({ db }) => {
    const selectedType: IMemberType = db.community?.memberTypes
      ?.map((memberTypeId: string) => db.byMemberTypeId[memberTypeId])
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
  const types: RadioOptionProps[] = useStoreState(({ db }) =>
    db.community?.memberTypes?.map((memberTypeId: string) => {
      const type: IMemberType = db.byMemberTypeId[memberTypeId];

      return {
        children: <ApplicationChooseTypeCard id={memberTypeId} />,
        label: type.name
      };
    })
  );

  const goForward = StoryStore.useStoreActions((state) => state.goForward);
  const onSubmit = async () => goForward();

  return (
    <Form onSubmit={onSubmit}>
      <FormMultipleChoice
        cardOptions={types}
        category={QuestionCategory.MEMBER_TYPE}
      />
      <ApplicationChooseTypeButton />
    </Form>
  );
};

const ApplicationChooseType: React.FC = () => {
  const isMultipleTypesOrPaid: boolean = useStoreState(({ db }) => {
    const types: string[] = db.community?.memberTypes;

    return types?.some((memberTypeId: string) => {
      const type: IMemberType = db.byMemberTypeId[memberTypeId];
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
