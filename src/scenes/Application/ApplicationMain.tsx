import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Form from '@components/organisms/Form/Form';
import { OnFormSubmitFunction } from '@components/organisms/Form/Form.types';
import FormItem from '@components/organisms/Form/FormItem';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import StoryStore from '@components/organisms/Story/Story.store';
import StoryPage from '@components/organisms/Story/StoryPage';
import useFindOne from '@core/gql/hooks/useFindOne';
import {
  IApplication,
  IQuestion,
  IRankedQuestion
} from '@util/constants.entities';
import { sortObjects } from '@util/util';
import useApplyToCommunity from './useApplyToCommunity';
import useValidateEmail from './useValidateEmail';

const ApplicationMainForm: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const isSolo: boolean = StoryStore.useStoreState(
    ({ pages }) =>
      pages?.filter(({ id }) => id !== 'CONFIRMATION')?.length === 1
  );

  const items = StoryStore.useStoreState((state) => state.items);

  const applyForMembership: OnFormSubmitFunction = useApplyToCommunity();
  const validateEmail: OnFormSubmitFunction = useValidateEmail();

  const { data: application, loading } = useFindOne(IApplication, {
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

  if (loading) return null;

  const questions: IQuestion[] = application.rankedQuestions
    ?.sort((a: IRankedQuestion, b: IRankedQuestion) =>
      sortObjects(a, b, 'rank', 'ASC')
    )
    ?.map((rankedQuestion: IRankedQuestion) => rankedQuestion.question);

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
  const communityId: string = useReactiveVar(communityIdVar);

  const { data: application, loading } = useFindOne(IApplication, {
    fields: ['community.id', 'community.logoUrl', 'description', 'title'],
    where: { communityId }
  });

  if (loading) return null;

  return (
    <StoryPage
      description={application.description}
      iconUrl={application.community.logoUrl}
      id="APPLICATION_MAIN"
      title={application.title}
    >
      <ApplicationMainForm />
    </StoryPage>
  );
};

export default ApplicationMain;
