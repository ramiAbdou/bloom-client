import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import { gql } from '@apollo/client';
import useBreakpoint from '@hooks/useBreakpoint';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import SidebarProfileContainer from './SidebarProfileContainer';
import SidebarProfileName from './SidebarProfileName';
import SidebarProfilePicture from './SidebarProfilePicture';
import SidebarProfileTitle from './SidebarProfileTitle';

const SidebarProfile: ComponentWithFragments<IMember> = ({ data: member }) => {
  const isTablet: boolean = useBreakpoint() <= 2;
  if (isTablet || !member) return null;

  return (
    <SidebarProfileContainer>
      <div>
        <SidebarProfilePicture data={member} />

        <div className="o-nav-profile-info">
          <SidebarProfileName data={member} />
          <SidebarProfileTitle data={member} />
        </div>
      </div>

      <IoChevronForwardOutline />
    </SidebarProfileContainer>
  );
};

SidebarProfile.fragment = gql`
  fragment SidebarProfileFragment on members {
    ...SidebarProfileNameFragment
    ...SidebarProfilePictureFragment
    ...SidebarProfileTitleFragment
  }
  ${SidebarProfileName.fragment}
  ${SidebarProfilePicture.fragment}
  ${SidebarProfileTitle.fragment}
`;

export default SidebarProfile;
