/**
 * @fileoverview Scene: Sidebar
 * @author Rami Abdou
 */

import './Sidebar.scss';

import React, { memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Separator from '@components/Misc/Separator';
import { usePrevious } from '@hooks/usePrevious';
import { useStoreState } from '@store/Store';
import ProfileBar from './ProfileBar';
import Sidebar, { LinkOptions } from './Sidebar.store';
import SidebarLink from './SidebarLink';

const SidebarContent = memo(() => {
  const name = useStoreState(({ community }) => community?.name);
  const setActiveTo = Sidebar.useStoreActions((actions) => actions.setActiveTo);

  const { location } = useHistory();
  const { pathname } = location;
  const activeTo = pathname.substring(pathname.lastIndexOf('/') + 1);
  const previousActiveTo = usePrevious(activeTo);

  useEffect(() => {
    if (previousActiveTo !== activeTo) setActiveTo(activeTo);
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
      <Separator style={{ marginBottom: 24, marginTop: 24 }} />

      <div className="s-home-sidebar-section-ctr">
        <div className="s-home-sidebar-section">
          <p>Main</p>
          {mainLinks.map((link) => (
            <SidebarLink key={link.to} {...link} />
          ))}
        </div>

        <div className="s-home-sidebar-section">
          <p>Admin</p>
          {adminLinks.map((link) => (
            <SidebarLink key={link.to} {...link} />
          ))}
        </div>

        <div className="s-home-sidebar-section">
          <p>Quick Actions</p>
          {actionLinks.map((link) => (
            <SidebarLink key={link.to} {...link} />
          ))}
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
