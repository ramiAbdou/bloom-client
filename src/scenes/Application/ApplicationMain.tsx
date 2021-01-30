import deepequal from 'fast-deep-equal';
import React from 'react';

import Form from '@organisms/Form/Form';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import useSyncStory from '@organisms/Story/useSyncStory';
import { IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const ApplicationMainForm: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { byId: byQuestionId } = db.entities.questions;

    return db.community?.questions
      ?.map((questionId: string) => byQuestionId[questionId])
      ?.filter((question: IQuestion) => question.inApplication);
  });

  const isSolo = StoryStore.useStoreState(({ pages }) => pages?.length === 1);
  const items = StoryStore.useStoreState((store) => store.items, deepequal);

  const syncStory = useSyncStory();

  return (
    <Form show={!!questions?.length} onSubmit={syncStory}>
      {questions?.map((props) => (
        <FormItem key={props?.id} value={items[props?.id]?.value} {...props} />
      ))}

      <FormSubmitButton>
        {isSolo ? 'Submit Application' : 'Next: Choose Membership'}
      </FormSubmitButton>
    </Form>
  );
};

const ApplicationMain: React.FC = () => {
  const description = useStoreState(({ db }) => db.application?.description);
  const title = useStoreState(({ db }) => db.application?.title);
  const iconUrl = useStoreState(({ db }) => db.community?.logoUrl);

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
