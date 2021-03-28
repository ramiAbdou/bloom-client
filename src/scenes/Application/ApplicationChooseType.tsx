import React from 'react';

import { RadioOptionProps } from '@molecules/Radio/Radio.types';
import Form from '@organisms/Form/Form';
import FormStore from '@organisms/Form/Form.store';
import FormMultipleChoice from '@organisms/Form/FormMultipleChoice';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import { IMemberPlan } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';
import ApplicationChooseTypeCard from './ApplicationChooseTypeCard';
import ApplicationPaymentForm from './ApplicationPaymentSection';

const ApplicationChooseTypeButton: React.FC = () => {
  const selectedTypeName: string = FormStore.useStoreState(({ items }) => {
    return items.MEMBER_PLAN?.value as string;
  });

  const isPaidMembershipSelected: boolean = useStoreState(({ db }) => {
    const selectedType: IMemberPlan = db.community?.plans
      ?.map((planId: string) => {
        return db.byMemberPlanId[planId];
      })
      ?.find((type: IMemberPlan) => {
        return type?.name === selectedTypeName;
      });

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
    return db.community?.plans?.map((planId: string) => {
      const type: IMemberPlan = db.byMemberPlanId[planId];

      return {
        children: <ApplicationChooseTypeCard id={planId} />,
        label: type.name
      };
    });
  });

  const goForward = StoryStore.useStoreActions((state) => {
    return state.goForward;
  });

  const onSubmit = async () => {
    return goForward();
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormMultipleChoice
        cardOptions={types}
        category={QuestionCategory.MEMBER_PLAN}
      />
      <ApplicationChooseTypeButton />
    </Form>
  );
};

const ApplicationChooseType: React.FC = () => {
  const isMultipleTypesOrPaid: boolean = useStoreState(({ db }) => {
    const types: string[] = db.community?.plans;

    return types?.some((planId: string) => {
      const type: IMemberPlan = db.byMemberPlanId[planId];
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
