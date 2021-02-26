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
import { ModalType } from '@util/constants';
import useBreakpoint from '@hooks/useBreakpoint';
import { useStoreActions, useStoreState } from '@store/Store';
import { LinkOptions } from './Nav.types';
import SideBarDuesContent from './NavMemberStatus';
import SideBarCommunityList from './SideBarCommunityList';
import SideBarProfile from './SideBarProfile';
import SideBarSection from './SideBarSection';

const SideBarContent: React.FC = () => {
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
    <div className="o-nav-main">
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
          <SideBarCommunityList />
          <SideBarContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
