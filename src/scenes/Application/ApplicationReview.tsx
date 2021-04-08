import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import Separator from '@atoms/Separator';
import { IMemberType } from '@db/db.entities';
import useFind from '@gql/useFind';
import Form from '@organisms/Form/Form';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import { useStoreState } from '@store/Store';
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
