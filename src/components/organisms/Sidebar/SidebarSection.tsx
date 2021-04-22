import { nanoid } from 'nanoid';
import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import { SidebarLinkOptions } from './Sidebar.types';
import SidebarLink from './SidebarLink';

interface SidebarSectionProps {
  links: SidebarLinkOptions[];
  title: string;
}

const SidebarSection: ComponentWithFragments<IMember, SidebarSectionProps> = ({
  data: member,
  links,
  title
}) => (
  <div className="mt-sm mr-ss">
    <h5 className="c-gray-3 mb-xs ml-sm">{title}</h5>
    {links.map((link) => (
      <SidebarLink key={link.to ?? nanoid()} data={member} {...link} />
    ))}
  </div>
);

SidebarSection.fragment = gql`
  fragment SidebarSectionFragment on members {
    ...SidebarLinkFragment
  }
  ${SidebarLink.fragment}
`;

export default SidebarSection;
