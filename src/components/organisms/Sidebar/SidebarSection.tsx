import { nanoid } from 'nanoid';
import React from 'react';

import { IMember } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
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
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { role } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  if (['Admin', 'Quick Actions'].includes(title) && !role) return null;

  return (
    <div className="mt-sm mr-ss">
      <h5 className="c-gray-3 mb-xs ml-sm">{title}</h5>
      {links.map((link) => (
        <SidebarLink key={link.to ?? nanoid()} {...link} />
      ))}
    </div>
  );
};

export default SidebarSection;
