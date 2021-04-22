import React from 'react';
import { IoCalendar, IoExit, IoPeople } from 'react-icons/io5';

import { gql } from '@apollo/client';
import useBreakpoint from '@hooks/useBreakpoint';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import { SidebarLinkOptions } from './Sidebar.types';
import SidebarSection from './SidebarSection';
import useLogout from './useLogout';

const SidebarProfileSection: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const isTablet: boolean = useBreakpoint() <= 2;
  const logout = useLogout();

  if (!isTablet) return null;

  const profileLinks: SidebarLinkOptions[] = [
    { Icon: IoPeople, title: 'Your Profile', to: 'profile' },
    { Icon: IoCalendar, title: 'Manage Membership', to: 'membership' },
    { Icon: IoExit, onClick: logout, title: 'Log Out' }
  ];

  return <SidebarSection data={member} links={profileLinks} title="Profile" />;
};

SidebarProfileSection.fragment = gql`
  fragment SidebarProfileSectionFragment on members {
    ...SidebarSectionFragment
  }
  ${SidebarSection.fragment}
`;

export default SidebarProfileSection;
