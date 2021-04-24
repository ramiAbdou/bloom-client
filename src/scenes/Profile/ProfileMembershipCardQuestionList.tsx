import React from 'react';

import { gql } from '@apollo/client';
import QuestionBox from '@components/molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@components/molecules/QuestionBox/QuestionBox.types';
import { ComponentWithFragments } from '@util/constants';
import { IMember, IMemberValue } from '@util/constants.entities';

const ProfileMembershipCardQuestionList: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const items: QuestionBoxItemProps[] = member.memberValues?.map(
    (memberValue: IMemberValue) => {
      return {
        title: memberValue.question.title,
        type: memberValue.question.type,
        value: memberValue.value
      };
    }
  );

  return <QuestionBox handleNull="HIDE_VALUE" items={items} />;
};

ProfileMembershipCardQuestionList.fragment = gql`
  fragment ProfileMembershipCardQuestionListFragment on members {
    memberValues(
      where: {
        question: {
          _or: [
            { category: { _eq: "Gender" } }
            { category: { _is_null: true } }
          ]
        }
      }
      order_by: { question: { rank: asc } }
    ) {
      id
      value

      question {
        title
        type
      }
    }
  }
`;

export default ProfileMembershipCardQuestionList;
