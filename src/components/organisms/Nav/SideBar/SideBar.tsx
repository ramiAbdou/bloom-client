import React, { useMemo } from 'react';
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

import Separator from '@atoms/Separator';
import useBreakpoint from '@hooks/useBreakpoint';
import { useStoreActions, useStoreState } from '@store/Store';
import { LinkOptions } from '../Nav.types';
import SideBarCommunityList from './SideBarCommunityList';
import SideBarDuesContent from './SideBarDuesContent';
import SideBarProfile from './SideBarProfile';
import SideBarSection from './SideBarSection';

const SideBarContent = () => {
  const name = useStoreState(({ db }) => db.community.name);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

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
    <div className="o-side-bar-main">
      <h3>{name}</h3>
      <Separator noMargin />
      <SideBarSection links={mainLinks} title="Main" />
      <SideBarSection links={adminLinks} title="Admin" />
      <SideBarSection links={quickLinks} title="Quick Actions" />
      <SideBarDuesContent />
      <SideBarProfile />
    </div>
  );
};

const SideBar: React.FC = () => {
  const isDesktop = useBreakpoint() >= 3;
  if (!isDesktop) return null;

  return (
    <div className="o-side-bar">
      <SideBarCommunityList />
      <SideBarContent />
    </div>
  );
};

export default SideBar;
