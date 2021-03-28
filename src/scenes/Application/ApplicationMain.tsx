import React from 'react';

import Form from '@organisms/Form/Form';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import { IQuestion, IRankedQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import useApplyToCommunity from './useApplyToCommunity';
import useValidateEmail from './useValidateEmail';

const ApplicationMainForm: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    return db.application?.questions
      ?.map((questionId: string) => {
        return db.byRankedQuestionId[questionId];
      })
      ?.sort((a, b) => {
        return sortObjects(a, b, 'rank', 'ASC');
      })
      ?.map((rankedQuestion: IRankedQuestion) => {
        return db.byQuestionId[rankedQuestion.question];
      });
  });

  const isSolo = StoryStore.useStoreState(({ pages }) => {
    return (
      pages?.filter(({ id }) => {
        return id !== 'CONFIRMATION';
      })?.length === 1
    );
  });

  const items = StoryStore.useStoreState((state) => {
    return state.items;
  });

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
  const description = useStoreState(({ db }) => {
    return db.application?.description;
  });

  const title = useStoreState(({ db }) => {
    return db.application?.title;
  });

  const iconUrl = useStoreState(({ db }) => {
    return db.community?.logoUrl;
  });

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
