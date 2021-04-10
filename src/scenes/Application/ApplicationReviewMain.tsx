import React from 'react';

import QuestionBox from '@components/molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@components/molecules/QuestionBox/QuestionBox.types';
import FormSection from '@components/organisms/Form/FormSection';
import FormSectionHeader from '@components/organisms/Form/FormSectionHeader';
import StoryStore from '@components/organisms/Story/Story.store';
import { IApplication, IQuestion, IRankedQuestion } from '@core/db/db.entities';
import useFindOneFull from '@core/gql/hooks/useFindOneFull';
import { useStoreState } from '@core/store/Store';
import { sortObjects } from '@util/util';

const ApplicationReviewMain: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data: application } = useFindOneFull(IApplication, {
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

  const questions: IQuestion[] = application.rankedQuestions
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
