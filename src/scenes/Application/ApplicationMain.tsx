import React from 'react';

import {
  IApplication,
  ICommunity,
  IQuestion,
  IRankedQuestion
} from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import Form from '@organisms/Form/Form';
import { OnFormSubmitFunction } from '@organisms/Form/Form.types';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import useApplyToCommunity from './useApplyToCommunity';
import useValidateEmail from './useValidateEmail';

const ApplicationMainForm: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { rankedQuestions } = useFindOne(IApplication, {
    fields: [
      'rankedQuestions.id',
      'rankedQuestions.question.category',
      'rankedQuestions.question.id',
      'rankedQuestions.question.options',
      'rankedQuestions.question.required',
      'rankedQuestions.question.title',
      'rankedQuestions.question.type',
      'rankedQuestions.rank'
    ],
    where: { communityId }
  });

  const questions: IQuestion[] = rankedQuestions
    ?.sort((a: IRankedQuestion, b: IRankedQuestion) =>
      sortObjects(a, b, 'rank', 'ASC')
    )
    ?.map((rankedQuestion: IRankedQuestion) => rankedQuestion.question);

  const isSolo: boolean = StoryStore.useStoreState(
    ({ pages }) =>
      pages?.filter(({ id }) => id !== 'CONFIRMATION')?.length === 1
  );

  const items = StoryStore.useStoreState((state) => state.items);

  const applyForMembership: OnFormSubmitFunction = useApplyToCommunity();
  const validateEmail: OnFormSubmitFunction = useValidateEmail();

  return (
    <Form
      show={!!questions?.length}
      spacing="lg"
      onSubmit={isSolo ? applyForMembership : validateEmail}
      onSubmitDeps={[isSolo]}
    >
      {questions?.map((question: IQuestion) => {
        const args = { ...question, ...items[question?.id] };
        return <FormItem key={args?.id} questionId={question?.id} {...args} />;
      })}

      <FormSubmitButton>
        {isSolo ? 'Submit Application' : 'Next: Choose Membership'}
      </FormSubmitButton>
    </Form>
  );
};

const ApplicationMain: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { description, title } = useFindOne(IApplication, {
    fields: ['description', 'title'],
    where: { communityId }
  });

  const { logoUrl } = useFindOne(ICommunity, {
    fields: ['logoUrl'],
    where: { id: communityId }
  });

  return (
    <StoryPage
      description={description}
      iconUrl={logoUrl}
      id="APPLICATION_MAIN"
      title={title}
    >
      <ApplicationMainForm />
    </StoryPage>
  );
};

export default ApplicationMain;
