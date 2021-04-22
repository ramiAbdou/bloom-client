import React from 'react';
import { IoFolderOpen, IoGlobe, IoStatsChart } from 'react-icons/io5';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import { SidebarLinkOptions } from './Sidebar.types';
import SidebarSection from './SidebarSection';

const SidebarAdminSection: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  if (!member.role) return null;

  const adminLinks: SidebarLinkOptions[] = [
    { Icon: IoStatsChart, title: 'Analytics', to: 'analytics' },
    { Icon: IoGlobe, title: 'Member Database', to: 'database' },
    { Icon: IoFolderOpen, title: 'Pending Applicants', to: 'applicants' }
    // { Icon: IoExtensionPuzzle, title: 'Integrations', to: 'integrations' }
  ];

  return <SidebarSection data={member} links={adminLinks} title="Admin" />;
};

SidebarAdminSection.fragment = gql`
  fragment SidebarAdminSectionFragment on members {
    ...SidebarSectionFragment
  }
  ${SidebarSection.fragment}
`;

export default SidebarAdminSection;
