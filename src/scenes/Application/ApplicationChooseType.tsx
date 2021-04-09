import React from 'react';

import { IMemberType } from '@db/db.entities';
import useFind from '@gql/hooks/useFind';
import useFindOne from '@gql/hooks/useFindOne';
import Form from '@organisms/Form/Form';
import FormStore from '@organisms/Form/Form.store';
import FormMultipleChoice from '@organisms/Form/FormMultipleChoice';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';
import ApplicationChooseTypeCard from './ApplicationChooseTypeCard';
import ApplicationPaymentForm from './ApplicationPaymentSection';

const ApplicationChooseTypeButton: React.FC = () => {
  const selectedTypeName: string = FormStore.useStoreState(
    ({ items }) => items.MEMBER_TYPE?.value as string
  );

  const communityId: string = useStoreState(({ db }) => db.communityId);

  const isPaidMembershipSelected: boolean = !!useFindOne(IMemberType, {
    where: { amount: { _gt: 0 }, communityId, name: selectedTypeName }
  });

  return (
    <FormSubmitButton show={!isPaidMembershipSelected}>
      Next: Confirmation
    </FormSubmitButton>
  );
};

const ApplicationChooseTypeForm: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const memberTypes: IMemberType[] = useFind(IMemberType, {
    fields: ['amount'],
    where: { communityId }
  });

  const goForward = StoryStore.useStoreActions((state) => state.goForward);
  const onSubmit = async () => goForward();

  return (
    <Form onSubmit={onSubmit}>
      <FormMultipleChoice
        cardOptions={memberTypes.map((memberType: IMemberType) => {
          return {
            children: <ApplicationChooseTypeCard id={memberType.id} />,
            label: memberType.name
          };
        })}
        category={QuestionCategory.MEMBER_TYPE}
      />
      <ApplicationChooseTypeButton />
    </Form>
  );
};

const ApplicationChooseType: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const memberTypes: IMemberType[] = useFind(IMemberType, {
    fields: ['amount'],
    where: { communityId }
  });

  const isMultipleTypesOrPaid: boolean = memberTypes?.some(
    (memberType: IMemberType) => !!memberType?.amount
  );

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
