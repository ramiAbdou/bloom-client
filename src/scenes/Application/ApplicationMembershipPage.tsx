import React from 'react';

import FormStore from '@organisms/Form/Form.store';
import FormContinueButton from '@organisms/Form/FormContinueButton';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryPage from '@organisms/Story/StoryPage';
import { IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const ApplicationMembershipPageButton: React.FC = () => {
  const numPages = FormStore.useStoreState(({ pages }) => pages?.length);

  const isPageCompleted = FormStore.useStoreState(
    (store) => store.isPageCompleted
  );

  if (numPages === 1) {
    return <FormSubmitButton>Submit Application</FormSubmitButton>;
  }

  return (
    <FormContinueButton disabled={!isPageCompleted}>
      {numPages === 2 ? 'Next: Confirmation' : 'Next: Choose Membership'}
    </FormContinueButton>
  );
};

const ApplicationMembershipPage: React.FC = () => {
  const iconUrl = useStoreState(({ db }) => db.community?.logoUrl);

  const description = useStoreState(({ db }) => {
    const { byId: byApplicationId } = db.entities.applications;
    return byApplicationId[db.community?.application]?.description;
  });

  const title = useStoreState(({ db }) => {
    const { byId: byApplicationId } = db.entities.applications;
    return byApplicationId[db.community?.application]?.title;
  });

  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { byId: byQuestionId } = db.entities.questions;
    return db.community?.questions
      ?.map((questionId: string) => byQuestionId[questionId])
      ?.filter((question: IQuestion) => question.inApplication);
  });

  if (!questions?.length) return null;

  return (
    <StoryPage
      description={description}
      iconUrl={iconUrl}
      id="APPLICATION"
      title={title}
    >
      {questions?.map((props) => (
        <FormItem key={props.id} pageId="APPLICATION" {...props} />
      ))}

      <ApplicationMembershipPageButton />
    </StoryPage>
  );
};

export default ApplicationMembershipPage;
