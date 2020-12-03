/**
 * @fileoverview Scene: Sidebar

 */

import './Sidebar.scss';

import React, { useEffect } from 'react';

import Separator from '@components/Misc/Separator';
import { useStoreState } from '@store/Store';
import ProfileBar from './ProfileBar';
import Sidebar, { LinkOptions } from './Sidebar.store';
import SidebarLink from './SidebarLink';
import useActiveTo from './useActiveTo';

const SidebarContent = () => {
  const name = useStoreState(({ community }) => community.name);
  const isDesktop = useStoreState(({ screen }) => screen.isDesktop);
  const isAdmin: boolean = useStoreState(({ entities }) => {
    const { byId: byCommunity } = entities.communities;
    const { byId: byMembership } = entities.memberships;
    return Object.values(byMembership).some(
      ({ community, role }) => !!role && name === byCommunity[community]?.name
    );
  });

  const setActiveTo = Sidebar.useStoreActions((actions) => actions.setActiveTo);
  const activeTo = useActiveTo();

  useEffect(() => {
    setActiveTo(activeTo);
  }, [activeTo]);

  const mainLinks: LinkOptions[] = [
    { title: 'Directory', to: 'directory' },
    { title: 'Events', to: 'events' }
  ];

  const adminLinks: LinkOptions[] = [
    { title: 'Analytics', to: 'analytics' },
    { title: 'Member Database', to: 'database' },
    { title: 'Pending Applicants', to: 'applicants' },
    { title: 'Integrations', to: 'integrations' }
  ];

  const actionLinks: LinkOptions[] = [
    { title: 'Create Event', to: 'create-event' },
    { title: 'Add Member', to: 'add-member' }
  ];

  return (
    <div className="s-home-sidebar">
      <h2>{name}</h2>
      <Separator style={{ marginBottom: 12, marginTop: 24 }} />

      <div className="s-home-sidebar-section-ctr">
        <div className="s-home-sidebar-section">
          <p>Main</p>
          {mainLinks.map((link) => (
            <SidebarLink key={link.to} {...link} />
          ))}
        </div>

        {isDesktop && isAdmin && (
          <div className="s-home-sidebar-section">
            <p>Admin</p>
            {adminLinks.map((link) => (
              <SidebarLink key={link.to} {...link} />
            ))}
          </div>
        )}

        {isDesktop && isAdmin && (
          <div className="s-home-sidebar-section">
            <p>Quick Actions</p>
            {actionLinks.map((link) => (
              <SidebarLink key={link.to} {...link} />
            ))}
          </div>
        )}
      </div>
      <div>
        <ProfileBar />
      </div>
    </div>
  );
};

export default () => (
  <Sidebar.Provider>
    <SidebarContent />
  </Sidebar.Provider>
);
