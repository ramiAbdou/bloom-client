import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useStoreState } from '@store/Store';
import { globalPanels } from './Panel.types';
import PanelContainer from './PanelContainer';
import PanelContent from './PanelContent';

const Panel: React.FC = () => {
  const isShowing = useStoreState(({ panel }) => {
    return panel.isShowing;
  });

  const panelId = useStoreState(({ panel }) => {
    return panel.id;
  });

  return createPortal(
    <AnimatePresence>
      {isShowing && globalPanels.includes(panelId) && (
        <PanelContainer>
          <PanelContent />
        </PanelContainer>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Panel;
