import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import { useStoreState } from '@core/store/Store';
import useBreakpoint from '@hooks/useBreakpoint';
import SidebarBackground from './SidebarBackground';

const SidebarContainer: React.FC = ({ children }) => {
  const isOpen: boolean = useStoreState(({ sidebar }) => sidebar.isOpen);
  const memberId: string = useReactiveVar(memberIdVar);
  const isDesktop: boolean = useBreakpoint() >= 3;

  const { pathname } = useLocation();

  const showSidebar: boolean =
    (isDesktop || !!isOpen) && !!memberId && !pathname.includes('/apply');

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
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <SidebarBackground />
    </>
  );
};

export default SidebarContainer;
