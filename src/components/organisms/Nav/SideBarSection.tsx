import { nanoid } from 'nanoid';
import React from 'react';

import { useStoreState } from '@store/Store';
import { LinkOptions } from './Nav.types';
import NavLink from './NavLink';

interface LinkSectionProps {
  links: LinkOptions[];
  title: string;
}

const SideBarSection: React.FC<LinkSectionProps> = ({
  links,
  title
}: LinkSectionProps) => {
  const isAdmin: boolean = useStoreState(({ db }) => !!db.member?.role);

  if (['Admin', 'Quick Actions'].includes(title) && !isAdmin) return null;

  return (
    <div className="o-nav-section">
      <h5>{title}</h5>
      {links.map((link) => (
        <NavLink key={link.to ?? nanoid()} {...link} />
      ))}
    </div>
  );
};

export default SideBarSection;
