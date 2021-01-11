import React from 'react';

import { useStoreState } from '@store/Store';
import { uuid } from '@util/util';
import { LinkOptions } from '../Nav.types';
import SidebarLink from './SideBarLink';

interface LinkSectionProps {
  links: LinkOptions[];
  title: string;
}

const SideBarSection: React.FC<LinkSectionProps> = ({
  links,
  title
}: LinkSectionProps) => {
  const isAdmin: boolean = useStoreState(({ db }) => !!db.member.role);

  if (['Admin', 'Quick Actions'].includes(title) && !isAdmin) return null;

  return (
    <div className="o-side-bar-section">
      <h5>{title}</h5>
      {links.map((link) => (
        <SidebarLink key={link.to ?? uuid()} {...link} />
      ))}
    </div>
  );
};

export default SideBarSection;
