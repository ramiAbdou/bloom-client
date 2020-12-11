import React, { useEffect, useMemo } from 'react';
import {
  IoAdd,
  IoCalendar,
  IoExtensionPuzzle,
  IoFolderOpen,
  IoGlobe,
  IoPeople,
  IoPersonAdd,
  IoStatsChart
} from 'react-icons/io5';

import Separator from '@components/Misc/Separator';
import AddMemberStore from '@scenes/Database/components/AddMember/AddMember.store';
import AddMemberModal from '@scenes/Database/components/AddMember/AddMemberModal';
import { useStoreActions, useStoreState } from '@store/Store';
import Home, { LinkOptions } from '../../Home.store';
import SidebarCommunityContainer from './Community.container';
import SidebarProfile from './Profile';
import SidebarSection from './Section';
import useActiveTo from './useActiveTo';

const SidebarContent = () => {
  const name = useStoreState(({ db }) => db.community.name);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const setActiveTo = Home.useStoreActions((store) => store.setActiveTo);

  const activeTo = useActiveTo();

  useEffect(() => {
    setActiveTo(activeTo);
  }, [activeTo]);

  const mainLinks: LinkOptions[] = useMemo(
    () => [
      { Icon: IoPeople, title: 'Directory', to: 'directory' },
      { Icon: IoCalendar, title: 'Events', to: 'events' }
    ],
    []
  );

  const adminLinks: LinkOptions[] = useMemo(
    () => [
      { Icon: IoStatsChart, title: 'Analytics', to: 'analytics' },
      { Icon: IoGlobe, title: 'Member Database', to: 'database' },
      { Icon: IoFolderOpen, title: 'Pending Applicants', to: 'applicants' },
      { Icon: IoExtensionPuzzle, title: 'Integrations', to: 'integrations' }
    ],
    []
  );

  const quickLinks: LinkOptions[] = useMemo(
    () => [
      { Icon: IoAdd, title: 'Create Event', to: '' },
      {
        Icon: IoPersonAdd,
        onClick: () => showModal('ADD_MEMBERS'),
        title: 'Add Member'
      }
    ],
    []
  );

  return (
    <div className="s-home-sidebar-main">
      <h2>{name}</h2>
      <Separator style={{ marginBottom: 12, marginTop: 24 }} />

      <div className="s-home-sidebar-section-ctr">
        <SidebarSection links={mainLinks} title="Main" />
        <SidebarSection links={adminLinks} title="Admin" />
        <SidebarSection links={quickLinks} title="Quick Actions" />
      </div>

      <div>
        <SidebarProfile />
      </div>
    </div>
  );
};

export default () => (
  <div className="s-home-sidebar">
    <SidebarCommunityContainer />
    <SidebarContent />
    <AddMemberStore.Provider>
      <AddMemberModal />
    </AddMemberStore.Provider>
  </div>
);
