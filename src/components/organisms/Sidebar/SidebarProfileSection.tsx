import React from 'react';
import { IoCalendar, IoExit, IoPeople } from 'react-icons/io5';

import useBreakpoint from '@hooks/useBreakpoint';
import { SidebarLinkOptions } from './Sidebar.types';
import SidebarSection from './SidebarSection';
import useLogout from './useLogout';

const SidebarProfileSection: React.FC = () => {
  const isTablet: boolean = useBreakpoint() <= 2;
  const logout = useLogout();

  const profileLinks: SidebarLinkOptions[] = [
    { Icon: IoPeople, title: 'Your Profile', to: 'profile' },
    { Icon: IoCalendar, title: 'Manage Membership', to: 'membership' },
    { Icon: IoExit, onClick: logout, title: 'Log Out' }
  ];

  if (!isTablet) return null;

  return <SidebarSection links={profileLinks} title="Profile" />;
};

export default SidebarProfileSection;
