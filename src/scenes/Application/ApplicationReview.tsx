import deline from 'deline';
import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import Separator from '@atoms/Separator';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import Form from '@organisms/Form/Form';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormSectionHeader from '@organisms/Form/FormSectionHeader';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import { IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import FormSection from '../../components/organisms/Form/FormSection';
import ApplicationReviewMembeship from './ApplicationReviewMembership';

const ApplicationReviewForm: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { byId: byQuestionId } = db.entities.questions;
    return db.community?.questions
      ?.map((questionId: string) => byQuestionId[questionId])
      ?.filter((question: IQuestion) => question.inApplication);
  });

  const hasCreditCard = StoryStore.useStoreState(({ items }) => {
    return !!items.CREDIT_OR_DEBIT_CARD;
  });

  const items: QuestionValueItemProps[] = StoryStore.useStoreState((store) => {
    return questions?.map(({ id, title, type }: IQuestion) => {
      return {
        handleNull: 'HIDE_ALL',
        title,
        type,
        value: store.items[id]?.value
      };
    });
  });

  return (
    <Form>
      <FormSection title="Application">
        <QuestionValueList items={items} marginBottom={24} />
      </FormSection>

      <ApplicationReviewMembeship />

      <FormSubmitButton>
        {hasCreditCard && <IoLockClosed />}
        {hasCreditCard ? 'Confirm Payment and Join' : 'Submit Application'}
      </FormSubmitButton>
    </Form>
  );
};

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
