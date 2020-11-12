/**
 * @fileoverview Scene: Sidebar
 * @author Rami Abdou
 */

import './Sidebar.scss';

import React, { memo } from 'react';

import Separator from '@components/Misc/Separator';
import { useStoreState } from '@store/Store';
import ProfileBar from './ProfileBar';
import Sidebar, { LinkOptions } from './Sidebar.store';
import SidebarLink from './SidebarLink';

const CommunityName = memo(() => {
  const name = useStoreState(({ community }) => community?.name);
  return <h2>{name}</h2>;
});

const SidebarContent = memo(() => {
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
      <CommunityName />
      <Separator style={{ marginBottom: 24, marginTop: 24 }} />

      <div className="s-home-sidebar-section-ctr">
        <div className="s-home-sidebar-section">
          <p>Main</p>
          {mainLinks.map((link) => {
            return <SidebarLink key={link.to} {...link} />;
          })}
        </div>

        <div className="s-home-sidebar-section">
          <p>Admin</p>
          {adminLinks.map((link) => {
            return <SidebarLink key={link.to} {...link} />;
          })}
        </div>

        <div className="s-home-sidebar-section">
          <p>Quick Actions</p>
          {actionLinks.map((link) => {
            return <SidebarLink key={link.to} {...link} />;
          })}
        </div>
      </div>

      <div>
        <ProfileBar />
      </div>
    </div>
  );
});

export default () => (
  <Sidebar.Provider>
    <SidebarContent />
  </Sidebar.Provider>
);
