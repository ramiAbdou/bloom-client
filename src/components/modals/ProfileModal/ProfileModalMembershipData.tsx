import React from 'react';

import { gql } from '@apollo/client';
import Separator from '@components/atoms/Separator';
import QuestionBox from '@components/molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@components/molecules/QuestionBox/QuestionBox.types';
import { ComponentWithFragments } from '@util/constants';
import { IMember, IMemberValue } from '@util/constants.entities';

const ProfileModalMembershipData: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  if (!member.memberValues?.length) return null;

  const items: QuestionBoxItemProps[] = member.memberValues?.map(
    (memberValue: IMemberValue) => {
      return {
        title: memberValue.question.title,
        type: memberValue.question.type,
        value: memberValue.value
      };
    }
  );

  return (
    <>
      <Separator margin={0} />
      <QuestionBox className="my-md" handleNull="HIDE_ALL" items={items} />
    </>
  );
};

ProfileModalMembershipData.fragments = {
  data: gql`
    fragment ProfileModalMembershipDataFragment on members {
      memberValues(
        where: {
          memberId: { _eq: $memberId }
          question: { category: { _is_null: true } }
          value: { _is_null: false }
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
  `
};

export default ProfileModalMembershipData;
