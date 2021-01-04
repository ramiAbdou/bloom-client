import React, { memo } from 'react';

import useBreakpoint from '@hooks/useBreakpoint';
import { LinkOptions } from '@scenes/Home/Home.store';
import { useStoreState } from '@store/Store';
import { uuid } from '@util/util';
import SidebarLink from './Link';

type LinkSectionProps = { links: LinkOptions[]; title: string };

export default memo(({ links, title }: LinkSectionProps) => {
  const isDesktop = useBreakpoint() === 'D';

  const isAdmin: boolean = useStoreState(({ db }) => {
    const { name } = db.community;
    const { byId: byCommunity } = db.entities.communities;
    const { byId: byMember } = db.entities.members;

    return Object.values(byMember).some(
      ({ community, role }) => !!role && name === byCommunity[community]?.name
    );
  });

  if (['Admin', 'Quick Actions'].includes(title) && (!isDesktop || !isAdmin)) {
    return null;
  }

  return (
    <div className="s-home-sidebar-section">
      <h5>{title}</h5>
      {links.map((link) => (
        <SidebarLink key={link.to ?? uuid()} {...link} />
      ))}
    </div>
  );
});
