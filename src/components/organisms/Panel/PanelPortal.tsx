import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useReactiveVar } from '@apollo/client';
import { panelVar } from '@components/organisms/Panel/Panel.state';
import PanelContent from './PanelContent';

const PanelPortal: React.FC = () => {
  const panelId: string = useReactiveVar(panelVar)?.id;

  return createPortal(
    <AnimatePresence>{panelId && <PanelContent />}</AnimatePresence>,
    document.body
  );
};

export default PanelPortal;
