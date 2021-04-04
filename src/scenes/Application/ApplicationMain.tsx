import React from 'react';

import Form from '@organisms/Form/Form';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import { IQuestion, IRankedQuestion } from '@db/Db.entities';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import useApplyToCommunity from './useApplyToCommunity';
import useValidateEmail from './useValidateEmail';

const ApplicationMainForm: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) =>
    db.application?.questions
      ?.map((questionId: string) => db.byRankedQuestionId[questionId])
      ?.sort((a, b) => sortObjects(a, b, 'rank', 'ASC'))
      ?.map(
        (rankedQuestion: IRankedQuestion) =>
          db.byQuestionId[rankedQuestion.question]
      )
  );

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
  const description: string = useStoreState(
    ({ db }) => db.application?.description
  );

  const title: string = useStoreState(({ db }) => db.application?.title);
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
