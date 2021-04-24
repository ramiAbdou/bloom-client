import React from 'react';

import { gql } from '@apollo/client';
import Card from '@components/containers/Card/Card';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import ProfileMembershipCardHeader from './ProfileMembershipCardHeader';
import ProfileMembershipCardOnboardingButton from './ProfileMembershipCardOnboardingButton';
import ProfileMembershipCardQuestionList from './ProfileMembershipCardQuestionList';

const ProfileMembershipCard: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <Card className="s-profile-card--membership">
    <ProfileMembershipCardHeader data={member} />
    <ProfileMembershipCardQuestionList data={member} />
    <ProfileMembershipCardOnboardingButton data={member} />
  </Card>
);

ProfileMembershipCard.fragment = gql`
  fragment ProfileMembershipCardFragment on members {
    ...ProfileMembershipCardHeaderFragment
    ...ProfileMembershipCardQuestionListFragment
  }
  ${ProfileMembershipCardHeader.fragment}
  ${ProfileMembershipCardQuestionList.fragment}
`;

export default ProfileMembershipCard;
