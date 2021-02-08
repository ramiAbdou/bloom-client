import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useStoreState } from '@store/Store';
import { localPanels } from './Panel.types';
import PanelContainer from './PanelContainer';
import PanelLocalContent from './PanelLocalContent';

const PanelLocal: React.FC = () => {
  const isShowing = useStoreState(({ panel }) => panel.isShowing);
  const panelId = useStoreState(({ panel }) => panel.id);

  return createPortal(
    <AnimatePresence>
      {isShowing && localPanels.includes(panelId) && (
        <PanelContainer>
          <PanelLocalContent />
        </PanelContainer>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default PanelLocal;
