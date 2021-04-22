import { nanoid } from 'nanoid';
import React from 'react';
import { IoCalendar, IoPeople } from 'react-icons/io5';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import { SidebarLinkOptions } from './Sidebar.types';
import SidebarLink from './SidebarLink';
// import SidebarSection from './SidebarSection';
import SidebarSectionContainer from './SidebarSectionContainer';

const SidebarMainSection: ComponentWithFragments<IMember> = () => {
  const mainLinks: SidebarLinkOptions[] = [
    { Icon: IoPeople, title: 'Directory', to: 'directory' },
    { Icon: IoCalendar, title: 'Events', to: 'events' }
  ];

  // <SidebarSection links={mainLinks} title="Main" />;

  return (
    <SidebarSectionContainer title="Main">
      {mainLinks.map((mainLink: SidebarLinkOptions) => (
        <SidebarLink key={mainLink.to ?? nanoid()} {...mainLink} />
      ))}
    </SidebarSectionContainer>
  );
};

SidebarMainSection.fragment = gql`
  fragment SidebarMainSectionFragment on members {
    id
  }
`;

export default SidebarMainSection;
