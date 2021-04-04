import React from 'react';

import QuestionBox from '@molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@molecules/QuestionBox/QuestionBox.types';
import FormSection from '@organisms/Form/FormSection';
import FormSectionHeader from '@organisms/Form/FormSectionHeader';
import StoryStore from '@organisms/Story/Story.store';
import { IQuestion } from '@store/db/Db.entities';
import { useStoreState } from '@store/Store';

const ApplicationReviewMain: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) =>
    db.community?.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      ?.filter((question: IQuestion) => !question.locked)
  );

  const items: QuestionBoxItemProps[] = StoryStore.useStoreState((state) =>
    questions?.map(({ id, title, type }: IQuestion) => {
      return {
        handleNull: 'HIDE_ALL',
        title,
        type,
        value: state.items[id]?.value
      };
    })
  );

  return (
    <FormSection>
      <FormSectionHeader title="Application" />
      <QuestionBox className="mb-md--nlc" items={items} />
    </FormSection>
  );
};

export default ApplicationReviewMain;
