import React from 'react';

import { IApplication, IQuestion, IRankedQuestion } from '@db/db.entities';
import { GQL } from '@gql/gql.types';
import useGQL from '@gql/useGQL';
import Form from '@organisms/Form/Form';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import useApplyToCommunity from './useApplyToCommunity';
import useValidateEmail from './useValidateEmail';

const ApplicationMainForm: React.FC = () => {
  // const applicationId: string = useStoreState(
  //   ({ db }) => db.community?.application
  // );

  const gql: GQL = useGQL();

  const { rankedQuestions }: IApplication = gql.applications.fromCache({
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
    id: 'ZltjB2QLmq9b9S0nVOUkG'
    // id: applicationId
  });

  const questions: IQuestion[] = rankedQuestions
    ?.sort((a, b) => sortObjects(a, b, 'rank', 'ASC'))
    ?.map((rankedQuestion: IRankedQuestion) => rankedQuestion.question);

  const isSolo: boolean = StoryStore.useStoreState(
    ({ pages }) =>
      pages?.filter(({ id }) => id !== 'CONFIRMATION')?.length === 1
  );

  const items = StoryStore.useStoreState((state) => state.items);
  const applyForMembership = useApplyToCommunity();
  const validateEmail = useValidateEmail();

  return (
    <Form
      show={!!questions?.length}
      spacing="lg"
      onSubmit={isSolo ? applyForMembership : validateEmail}
      onSubmitDeps={[isSolo]}
    >
      {questions?.map((props) => {
        const args = { ...props, ...items[props?.id] };
        return <FormItem key={args?.id} questionId={props?.id} {...args} />;
      })}

      <FormSubmitButton>
        {isSolo ? 'Submit Application' : 'Next: Choose Membership'}
      </FormSubmitButton>
    </Form>
  );
};

const ApplicationMain: React.FC = () => {
  // const applicationId: string = useStoreState(
  //   ({ db }) => db.community?.application
  // );

  const gql: GQL = useGQL();

  const { description, title }: IApplication = gql.applications.fromCache({
    fields: ['description', 'title'],
    id: 'ZltjB2QLmq9b9S0nVOUkG'
    // id: applicationId
  });

  const iconUrl: string = useStoreState(({ db }) => db.community?.logoUrl);

  return (
    <StoryPage
      description={description}
      iconUrl={iconUrl}
      id="APPLICATION_MAIN"
      title={title}
    >
      <ApplicationMainForm />
    </StoryPage>
  );
};

export default ApplicationMain;
