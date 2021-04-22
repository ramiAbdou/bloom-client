import React from 'react';
import { IoLockClosed } from 'react-icons/io5';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Separator from '@components/atoms/Separator';
import Form from '@components/organisms/Form/Form';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import StoryStore from '@components/organisms/Story/Story.store';
import StoryPage from '@components/organisms/Story/StoryPage';
import { IMemberType } from '@util/db.entities';
import useFind from '@core/gql/hooks/useFind';
import ApplicationReviewMain from './ApplicationReviewMain';
import ApplicationReviewMembership from './ApplicationReviewMembership';
import useApplyToCommunity from './useApplyToCommunity';

const ApplicationReviewButton: React.FC = () => {
  const hasCreditCard: boolean = StoryStore.useStoreState(
    ({ items }) => !!items.CREDIT_OR_DEBIT_CARD
  );

  return (
    <FormSubmitButton>
      {hasCreditCard && <IoLockClosed />}
      {hasCreditCard ? 'Confirm Payment and Join' : 'Submit Application'}
    </FormSubmitButton>
  );
};

const ApplicationReviewForm: React.FC = () => {
  const applyForMembership = useApplyToCommunity();

  return (
    <Form options={{ disableValidation: true }} onSubmit={applyForMembership}>
      <ApplicationReviewMain />
      <ApplicationReviewMembership />
      <ApplicationReviewButton />
    </Form>
  );
};

const ApplicationReview: React.FC = () => {
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
      className="s-application-review"
      description="You’re almost done! Just review this information to make sure we got everything right."
      id="FINISH"
      show={!!isMultipleTypesOrPaid}
      title="Review"
    >
      <Separator marginBottom={24} marginTop={0} />
      <ApplicationReviewForm />
    </StoryPage>
  );
};

export default ApplicationReview;
