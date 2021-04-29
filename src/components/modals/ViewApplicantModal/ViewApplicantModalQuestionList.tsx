import React from 'react';

import { gql } from '@apollo/client';
import QuestionBox from '@components/molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@components/molecules/QuestionBox/QuestionBox.types';
import { ComponentWithFragments, QuestionCategory } from '@util/constants';
import { IMember, IMemberValue } from '@util/constants.entities';

const ViewApplicantModalQuestionList: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const items: QuestionBoxItemProps[] = member.memberValues?.map(
    (memberValue: IMemberValue) => {
      return {
        title: memberValue.question.title,
        type: memberValue.question.type,
        value:
          memberValue.question.category === QuestionCategory.EMAIL
            ? member.email
            : memberValue.value
      };
    }
  );

  return (
    <section className="c-modal-content-ctr">
      <QuestionBox items={items} />
    </section>
  );
};

ViewApplicantModalQuestionList.fragment = gql`
  fragment ViewApplicantModalQuestionListFragment on members {
    email

    memberValues(
      where: {
        _or: [
          { question: { category: { _is_null: true } } }
          { question: { category: { _eq: "Email" } } }
          { question: { category: { _eq: "Gender" } } }
        ]
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

export default ViewApplicantModalQuestionList;
