import { nanoid } from 'nanoid';
import React from 'react';

import { useStoreState } from '@store/Store';
import { SidebarLinkOptions } from './Sidebar.types';
import SidebarLink from './SidebarLink';

interface LinkSectionProps {
  links: SidebarLinkOptions[];
  title: string;
}

const SidebarSection: React.FC<LinkSectionProps> = ({
  links,
  title
}: LinkSectionProps) => {
  const isAdmin: boolean = useStoreState(({ db }) => {
    return !!db.member?.role;
  });

  if (['Admin', 'Quick Actions'].includes(title) && !isAdmin) return null;

  return (
    <div className="o-nav-section">
      <h5 className="c-gray-3 mb-xs ml-sm">{title}</h5>
      {links.map((link) => {
        return <SidebarLink key={link.to ?? nanoid()} {...link} />;
      })}
    </div>
  );
};

export default SidebarSection;
