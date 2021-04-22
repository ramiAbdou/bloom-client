import { nanoid } from 'nanoid';
import React from 'react';

import { IMember } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import { SidebarLinkOptions } from './Sidebar.types';
import SidebarLink from './SidebarLink';

interface SidebarSectionProps {
  links: SidebarLinkOptions[];
  title: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ links, title }) => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { data: member } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  if (['Admin', 'Quick Actions'].includes(title) && !member.role) return null;

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
