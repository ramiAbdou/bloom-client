import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Form from '@components/organisms/Form/Form';
import FormStore from '@components/organisms/Form/Form.store';
import FormMultipleChoice from '@components/organisms/Form/FormMultipleChoice';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import StoryStore from '@components/organisms/Story/Story.store';
import StoryPage from '@components/organisms/Story/StoryPage';
import useFind from '@core/gql/hooks/useFind';
import useFindOne from '@gql/hooks/useFindOne';
import { QuestionCategory } from '@util/constants';
import { IMemberType } from '@util/db.entities';
import ApplicationChooseTypeCard from './ApplicationChooseTypeCard';
import ApplicationPaymentForm from './ApplicationPaymentSection';

const ApplicationChooseTypeButton: React.FC = () => {
  const selectedTypeName: string = FormStore.useStoreState(
    ({ items }) => items.MEMBER_TYPE?.value as string
  );

  const communityId: string = useReactiveVar(communityIdVar);

  const isPaidMembershipSelected: boolean = !!useFindOne(IMemberType, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    where: { amount: { _gt: 0 }, communityId, name: selectedTypeName }
  })?.data;

  return (
    <FormSubmitButton show={!isPaidMembershipSelected}>
      Next: Confirmation
    </FormSubmitButton>
  );
};

const ApplicationChooseTypeForm: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);
  const goForward = StoryStore.useStoreActions((state) => state.goForward);

  const { data: memberTypes, loading } = useFind(IMemberType, {
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
  const communityId: string = useReactiveVar(communityIdVar);

  const { data: memberTypes, loading } = useFind(IMemberType, {
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
