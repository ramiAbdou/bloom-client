import React from 'react';

import { gql } from '@apollo/client';
import Card from '@components/containers/Card/Card';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import ApplicantsCardButtonList from './ApplicantsCardButtonList';
import ApplicantsCardHeader from './ApplicantsCardHeader';
import ApplicantsCardQuestionList from './ApplicantsCardQuestionList';

const ApplicantsCard: ComponentWithFragments<IMember> = ({ data: member }) => (
  <Card className="bs-bb w-100--m">
    <ApplicantsCardHeader data={member} />
    <ApplicantsCardQuestionList data={member} />
    <ApplicantsCardButtonList data={member} />
  </Card>
);

ApplicantsCard.fragment = gql`
  fragment ApplicantsCardFragment on members {
    ...ApplicantsCardButtonListFragment
    ...ApplicantsCardHeaderFragment
    ...ApplicantsCardQuestionListFragment
  }
  ${ApplicantsCardButtonList.fragment}
  ${ApplicantsCardHeader.fragment}
  ${ApplicantsCardQuestionList.fragment}
`;

export default ApplicantsCard;
