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

const ProfilePersonal: ComponentWithFragments<IMember> = ({ data: member }) => (
  <div className="mb-sm--nlc">
    <ProfileModalPicture data={member} />
    <ProfileModalFullName data={member} />
    <ProfileModalTagList data={member} />
    <ProfileModalEmail data={member} />
    <ProfileModalBio data={member} />
    <ProfileModalSocialList data={member} />
  </div>
);

ProfilePersonal.fragments = {
  data: gql`
    fragment ProfilePersonalFragment on members {
      ...ProfileModalBioFragment
      ...ProfileModalEmailFragment
      ...ProfileModalFullNameFragment
      ...ProfileModalPictureFragment
      ...ProfileModalSocialListFragment
      ...ProfileModalTagListFragment
    }
    ${ProfileModalBio.fragments.data}
    ${ProfileModalEmail.fragments.data}
    ${ProfileModalFullName.fragments.data}
    ${ProfileModalPicture.fragments.data}
    ${ProfileModalSocialList.fragments.data}
    ${ProfileModalTagList.fragments.data}
  `
};

export default ProfilePersonal;
