import React from 'react';

import { gql } from '@apollo/client';
import QuestionBox from '@components/molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@components/molecules/QuestionBox/QuestionBox.types';
import { ComponentWithFragments } from '@util/constants';
import { IMember, IMemberValue } from '@util/constants.entities';

const ApplicantsCardQuestionList: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const items: QuestionBoxItemProps[] = member.memberValues
    ?.map((memberValue: IMemberValue) => {
      return {
        title: memberValue.question.title,
        type: memberValue.question.type,
        value: memberValue.value
      };
    })
    ?.slice(0, 5);

  return <QuestionBox className="mb-md--nlc" items={items} />;
};

ApplicantsCardQuestionList.fragment = gql`
  fragment ApplicantsCardQuestionListFragment on members {
    memberValues(
      where: {
        question: { category: { _is_null: true } }
        value: { _is_null: false }
      }
      order_by: { question: { rank: asc } }
    ) {
      id
      value

      question {
        category
        id
        title
        type
      }
    }
  }
`;

export default ApplicantsCardQuestionList;
