import React from 'react';

import { IApplication, IQuestion, IRankedQuestion } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import QuestionBox from '@molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@molecules/QuestionBox/QuestionBox.types';
import FormSection from '@organisms/Form/FormSection';
import FormSectionHeader from '@organisms/Form/FormSectionHeader';
import StoryStore from '@organisms/Story/Story.store';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';

const ApplicationReviewMain: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { rankedQuestions } = useFindOne(IApplication, {
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

  const questions: IQuestion[] = rankedQuestions
    ?.sort((a: IRankedQuestion, b: IRankedQuestion) =>
      sortObjects(a, b, 'rank', 'ASC')
    )
    ?.map((rankedQuestion: IRankedQuestion) => rankedQuestion.question);

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
