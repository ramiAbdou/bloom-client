import React from 'react';

import { gql } from '@apollo/client';
import FormItem from '@components/organisms/Form/FormItem';
import { useStory } from '@components/organisms/Story/Story.state';
import { ComponentWithFragments } from '@util/constants';
import {
  IApplication,
  IQuestion,
  IRankedQuestion
} from '@util/constants.entities';

const ApplicationMainPageFormQuestionList: ComponentWithFragments<IApplication> = ({
  data: application
}) => {
  const [{ items }] = useStory();

  const questions: IQuestion[] = application.rankedQuestions?.map(
    (rankedQuestion: IRankedQuestion) => rankedQuestion.question
  );

  return (
    <>
      {questions?.map((question: IQuestion) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const args = { ...question, ...items[question?.id] };
        return <FormItem key={args?.id} questionId={question?.id} {...args} />;
      })}
    </>
  );
};

ApplicationMainPageFormQuestionList.fragment = gql`
  fragment ApplicationMainPageFormQuestionListFragment on applications {
    rankedQuestions(order_by: { rank: asc }) {
      id

      question {
        category
        description
        id
        options
        required
        title
        type
      }
    }
  }
`;

export default ApplicationMainPageFormQuestionList;
