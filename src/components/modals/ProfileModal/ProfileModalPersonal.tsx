import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import ProfileModalBio from './ProfileModalBio';
import ProfileModalEmail from './ProfileModalEmail';
import ProfileModalFullName from './ProfileModalFullName';
import ProfileModalPicture from './ProfileModalPicture';
import ProfileModalSocialList from './ProfileModalSocialList';
import ProfileModalTagList from './ProfileModalTagList';

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
