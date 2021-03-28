import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import Separator from '@atoms/Separator';
import useBreakpoint from '@hooks/useBreakpoint';
import { useStoreState } from '@store/Store';
import SidebarAdminSection from './SidebarAdminSection';
import SidebarBackground from './SidebarBackground';
import SidebarCommunityList from './SidebarCommunityList';
import SidebarMainSection from './SidebarMainSection';
import SidebarDuesContent from './SidebarMemberStatus';
import SidebarProfile from './SidebarProfile';
import SidebarProfileSection from './SidebarProfileSection';
import SidebarQuickActionsSection from './SidebarQuickActionsSection';

const SidebarCommunityName: React.FC = () => {
  const name: string = useStoreState(({ db }) => {
    return db.community?.name;
  });

  return (
    <>
      <h3 className="c-primary mx-sm my-md">{name}</h3>
      <Separator noMargin />
    </>
  );
};

const SidebarContent: React.FC = () => {
  return (
    <div className="f f-col o-scroll w-100">
      <SidebarCommunityName />
      <SidebarMainSection />
      <SidebarAdminSection />
      <SidebarQuickActionsSection />
      <SidebarProfileSection />
      <SidebarDuesContent />
      <SidebarProfile />
    </div>
  );
};

const Sidebar: React.FC = () => {
  const isOpen: boolean = useStoreState(({ sidebar }) => {
    return sidebar.isOpen;
  });

  const isDesktop: boolean = useBreakpoint() >= 3;

  return (
    <>
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

      <SidebarBackground />
    </>
  );
};

export default Sidebar;
