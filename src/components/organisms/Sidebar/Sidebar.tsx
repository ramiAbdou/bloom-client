import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useLocation } from 'react-router-dom';

import Separator from '@components/atoms/Separator';
import { ICommunity } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import useBreakpoint from '@hooks/useBreakpoint';
import { useStoreState } from '@store/Store';
import SidebarAdminSection from './SidebarAdminSection';
import SidebarBackground from './SidebarBackground';
import SidebarCommunityList from './SidebarCommunityList';
import SidebarMainSection from './SidebarMainSection';
import SidebarProfile from './SidebarProfile';
import SidebarProfileSection from './SidebarProfileSection';
import SidebarQuickActionsSection from './SidebarQuickActionsSection';

const SidebarCommunityName: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { name } = useFindOne(ICommunity, {
    fields: ['name'],
    where: { id: communityId }
  });

  return (
    <>
      <h3 className="c-primary mx-sm my-md">{name}</h3>
      <Separator noMargin />
    </>
  );
};

const SidebarContent: React.FC = () => (
  <div className="f f-col o-scroll w-100">
    <SidebarCommunityName />
    <SidebarMainSection />
    <SidebarAdminSection />
    <SidebarQuickActionsSection />
    <SidebarProfileSection />
    <SidebarProfile />
  </div>
);

const Sidebar: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);
  const isOpen: boolean = useStoreState(({ sidebar }) => sidebar.isOpen);
  const isDesktop: boolean = useBreakpoint() >= 3;

  const { pathname } = useLocation();

  const showSidebar: boolean =
    (isDesktop || !!isOpen) && !!memberId && !pathname.includes('/apply');

  // console.log(showSidebar, !!urlName && pathname !== `/${urlName}/apply`);
  // console.log('urlName', urlName, pathname);

  return (
    <>
      <AnimatePresence>
        {showSidebar && (
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
