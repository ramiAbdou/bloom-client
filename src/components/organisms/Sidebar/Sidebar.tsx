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
import SidebarQuickActionsSection from './SidebarQuickActionsSection';

const SidebarContent: React.FC = () => {
  const name = useStoreState(({ db }) => db.community?.name);

  return (
    <div className="f f-col w-100 o-nav-main o-scroll">
      <h3 className="c-primary mx-sm my-md">{name}</h3>
      <Separator noMargin />
      <SidebarMainSection />
      <SidebarAdminSection />
      <SidebarQuickActionsSection />
      <SidebarDuesContent />
      <SidebarProfile />
    </div>
  );
};

const Sidebar: React.FC = () => {
  const isOpen: boolean = useStoreState(({ sidebar }) => sidebar.isOpen);
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
