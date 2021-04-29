import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import ProfileModalBio from './ViewProfileModalBio';
import ProfileModalEmail from './ViewProfileModalEmail';
import ProfileModalFullName from './ViewProfileModalFullName';
import ProfileModalPicture from './ViewProfileModalPicture';
import ProfileModalSocialList from './ViewProfileModalSocialList';
import ProfileModalTagList from './ViewProfileModalTagList';

const ProfileModalPersonal: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <div className="mb-sm--nlc">
    <ProfileModalPicture data={member} />
    <ProfileModalFullName data={member} />
    <ProfileModalTagList data={member} />
    <ProfileModalEmail data={member} />
    <ProfileModalBio data={member} />
    <ProfileModalSocialList data={member} />
  </div>
);

ProfileModalPersonal.fragment = gql`
  fragment ProfileModalPersonalFragment on members {
    ...ProfileModalBioFragment
    ...ProfileModalEmailFragment
    ...ProfileModalFullNameFragment
    ...ProfileModalPictureFragment
    ...ProfileModalSocialListFragment
    ...ProfileModalTagListFragment
  }
  ${ProfileModalBio.fragment}
  ${ProfileModalEmail.fragment}
  ${ProfileModalFullName.fragment}
  ${ProfileModalPicture.fragment}
  ${ProfileModalSocialList.fragment}
  ${ProfileModalTagList.fragment}
`;

export default ProfileModalPersonal;
