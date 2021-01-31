import React from 'react';

import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import FormSection from '@organisms/Form/FormSection';
import StoryStore from '@organisms/Story/Story.store';
import { IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const ApplicationReviewMain: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { byId: byQuestionId } = db.entities.questions;
    return db.community?.questions
      ?.map((questionId: string) => byQuestionId[questionId])
      ?.filter((question: IQuestion) => question.inApplication);
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
    <FormSection title="Application">
      <QuestionValueList items={items} marginBottom={24} />
    </FormSection>
  );
};

export default ApplicationReviewMain;
