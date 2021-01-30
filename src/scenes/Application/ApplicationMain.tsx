import React from 'react';

import Form from '@organisms/Form/Form';
import FormStore from '@organisms/Form/Form.store';
import FormContinueButton from '@organisms/Form/FormContinueButton';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryPage from '@organisms/Story/StoryPage';
import { IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const ApplicationMainButton: React.FC = () => {
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

const ApplicationMain: React.FC = () => {
  const description = useStoreState(({ db }) => db.application?.description);
  const title = useStoreState(({ db }) => db.application?.title);
  const iconUrl = useStoreState(({ db }) => db.community?.logoUrl);

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
      <Form>
        {questions?.map((props) => (
          <FormItem key={props.id} pageId="APPLICATION" {...props} />
        ))}

        <ApplicationMainButton />
      </Form>
    </StoryPage>
  );
};

export default ApplicationMain;
