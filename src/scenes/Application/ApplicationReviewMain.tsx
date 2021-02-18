import React from 'react';

import QuestionBox from '@molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@molecules/QuestionBox/QuestionBox.types';
import FormSection from '@organisms/Form/FormSection';
import StoryStore from '@organisms/Story/Story.store';
import { IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const ApplicationReviewMain: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    return db.community?.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      ?.filter((question: IQuestion) => !question.autoGenerated);
  });

  const items: QuestionBoxItemProps[] = StoryStore.useStoreState((store) => {
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
      <QuestionBox className="mb-md" items={items} />
    </FormSection>
  );
};

export default ApplicationReviewMain;
