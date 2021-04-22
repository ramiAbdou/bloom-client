import React from 'react';
import { IoCalendar, IoPeople } from 'react-icons/io5';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import { SidebarLinkOptions } from './Sidebar.types';
import SidebarSection from './SidebarSection';

const SidebarMainSection: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const mainLinks: SidebarLinkOptions[] = [
    { Icon: IoPeople, title: 'Directory', to: 'directory' },
    { Icon: IoCalendar, title: 'Events', to: 'events' }
  ];

  return <SidebarSection data={member} links={mainLinks} title="Admin" />;
};

SidebarMainSection.fragment = gql`
  fragment SidebarMainSectionFragment on members {
    ...SidebarSectionFragment
  }
  ${SidebarSection.fragment}
`;

export default SidebarMainSection;
