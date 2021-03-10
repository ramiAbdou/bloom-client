import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import {
  IoAdd,
  IoCalendar,
  IoCloud,
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
import { ModalType } from '@util/constants';
import { LinkOptions } from './Nav.types';
import SidebarDuesContent from './NavMemberStatus';
import SidebarCommunityList from './SidebarCommunityList';
import SidebarProfile from './SidebarProfile';
import SidebarSection from './SidebarSection';

const SidebarContent: React.FC = () => {
  const autoAccept = useStoreState(({ db }) => db.community?.autoAccept);
  const name = useStoreState(({ db }) => db.community?.name);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const mainLinks: LinkOptions[] = [
    { Icon: IoPeople, title: 'Directory', to: 'directory' },
    { Icon: IoCalendar, title: 'Events', to: 'events' },
    {
      Icon: IoCloud,
      onClick: () => {
        if (navigator.vendor === 'Apple Computer, Inc.') {
          window.location.href = 'https://www.notion.so/login';
        } else window.open('https://www.notion.so/login');
      },
      title: 'Knowledge Hub'
    }
  ];

  const pendingApplicantsLinks: LinkOptions[] = !autoAccept
    ? [{ Icon: IoFolderOpen, title: 'Pending Applicants', to: 'applicants' }]
    : [];

  const adminLinks: LinkOptions[] = [
    { Icon: IoStatsChart, title: 'Analytics', to: 'analytics' },
    { Icon: IoGlobe, title: 'Member Database', to: 'database' },
    ...pendingApplicantsLinks,
    { Icon: IoExtensionPuzzle, title: 'Integrations', to: 'integrations' }
  ];

  const quickLinks: LinkOptions[] = [
    {
      Icon: IoAdd,
      onClick: () => showModal({ id: ModalType.CREATE_EVENT }),
      title: 'Create Event'
    },
    {
      Icon: IoPersonAdd,
      onClick: () => showModal({ id: ModalType.ADD_MEMBERS }),
      title: 'Add Member'
    }
  ];

  return (
    <div className="f f-col w-100 o-nav-main o-scroll">
      <h3 className="c-primary mx-sm my-md">{name}</h3>
      <Separator noMargin />
      <SidebarSection links={mainLinks} title="Main" />
      <SidebarSection links={adminLinks} title="Admin" />
      <SidebarSection links={quickLinks} title="Quick Actions" />
      <SidebarDuesContent />
      <SidebarProfile />
    </div>
  );
};

const Sidebar: React.FC = () => {
  const isOpen = useStoreState(({ nav }) => nav.isOpen);
  const isDesktop = useBreakpoint() >= 3;

  return (
    <AnimatePresence>
      {(isDesktop || !!isOpen) && (
        <motion.div
          animate={{ x: !isDesktop && 0 }}
          className="o-nav"
          exit={{ x: !isDesktop && -1000 }}
          initial={{ x: !isDesktop && -1000 }}
          transition={{ damping: 300 }}
        >
          <SidebarCommunityList />
          <SidebarContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
