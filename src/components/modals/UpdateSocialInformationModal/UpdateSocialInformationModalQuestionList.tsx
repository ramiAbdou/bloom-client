import React from 'react';

import { gql } from '@apollo/client';
import FormImage from '@components/organisms/Form/FormImage';
import FormLongText from '@components/organisms/Form/FormLongText';
import FormShortText from '@components/organisms/Form/FormShortText';
import { ComponentWithFragments, QuestionCategory } from '@util/constants';
import { IMember } from '@util/constants.entities';

const UpdateSocialInformationModalQuestionList: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <ul>
    <FormImage
      id="PROFILE_PICTURE"
      required={false}
      value={member.pictureUrl}
    />

    <FormShortText
      category={QuestionCategory.FIRST_NAME}
      title="First Name"
      value={member.firstName}
    />

    <FormShortText
      category={QuestionCategory.LAST_NAME}
      title="Last Name"
      value={member.lastName}
    />

    <FormLongText id="BIO" required={false} title="Bio" value={member.bio} />
  </ul>
);

UpdateSocialInformationModalQuestionList.fragment = gql`
  fragment UpdateSocialInformationModalQuestionListFragment on members {
    bio
    firstName
    lastName
    pictureUrl
  }
`;

export default UpdateSocialInformationModalQuestionList;
