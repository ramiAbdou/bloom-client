import deline from 'deline';
import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import Separator from '@atoms/Separator';
import Form from '@organisms/Form/Form';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import { useStoreState } from '@store/Store';
import ApplicationReviewMain from './ApplicationReviewMain';
import ApplicationReviewMembership from './ApplicationReviewMembership';

const ApplicationReviewButton: React.FC = () => {
  const hasCreditCard = StoryStore.useStoreState(({ items }) => {
    return !!items.CREDIT_OR_DEBIT_CARD;
  });

  return (
    <FormSubmitButton>
      {hasCreditCard && <IoLockClosed />}
      {hasCreditCard ? 'Confirm Payment and Join' : 'Submit Application'}
    </FormSubmitButton>
  );
};

const ApplicationReviewForm: React.FC = () => (
  <Form>
    <ApplicationReviewMain />
    <ApplicationReviewMembership />
    <ApplicationReviewButton />
  </Form>
);

const ApplicationReview: React.FC = () => {
  const showForm: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    const types = db.community?.types;
    const isMoreThanOneType = types?.length > 1;
    const isFirstTypePaid = !!types && !byTypeId[types[0]]?.isFree;
    return isMoreThanOneType || isFirstTypePaid;
  });

  return (
    <StoryPage
      className="s-application-review"
      description={deline`
        You’re almost done! Just review this information to make sure we got
        everything right.
      `}
      id="FINISH"
      show={!!showForm}
      title="Review"
    >
      <Separator marginBottom={24} marginTop={0} />
      <ApplicationReviewForm />
    </StoryPage>
  );
};

export default ApplicationReview;
