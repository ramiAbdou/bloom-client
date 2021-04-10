import React from 'react';

import Form from '@components/organisms/Form/Form';
import FormStore from '@components/organisms/Form/Form.store';
import FormMultipleChoice from '@components/organisms/Form/FormMultipleChoice';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import StoryStore from '@components/organisms/Story/Story.store';
import StoryPage from '@components/organisms/Story/StoryPage';
import { IMemberType } from '@core/db/db.entities';
import useFindFull from '@core/gql/hooks/useFindFull';
import { useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
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
  })?.data;

  return (
    <FormSubmitButton show={!isPaidMembershipSelected}>
      Next: Confirmation
    </FormSubmitButton>
  );
};

const ApplicationChooseTypeForm: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);
  const goForward = StoryStore.useStoreActions((state) => state.goForward);

  const { data: memberTypes, loading } = useFindFull(IMemberType, {
    fields: ['amount'],
    where: { communityId }
  });

  if (loading) return null;

  const onSubmit = async (): Promise<void> => {
    goForward();
  };

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

  const { data: memberTypes, loading } = useFindFull(IMemberType, {
    fields: ['amount'],
    where: { communityId }
  });

  if (loading) return null;

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
