import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useStoreState } from '@store/Store';
import { PanelType } from '@util/constants';
import { localPanels } from './Panel.types';
import PanelContainer from './PanelContainer';
import PanelLocalContent from './PanelLocalContent';

const PanelLocal: React.FC = () => {
  const isShowing: boolean = useStoreState(({ panel }) => {
    return panel.isShowing;
  });

  const panelId: PanelType = useStoreState(({ panel }) => {
    return panel.id;
  });

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
