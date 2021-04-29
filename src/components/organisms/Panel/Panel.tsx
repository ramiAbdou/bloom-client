import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useReactiveVar } from '@apollo/client';
import { panelVar } from '@core/state/Panel.state';
import PanelContainer from './PanelContainer';
import PanelContent from './PanelContent';

const Panel: React.FC = () => {
  const panelId: string = useReactiveVar(panelVar)?.id;

  return createPortal(
    <AnimatePresence>
      {panelId && (
        <PanelContainer>
          <PanelContent />
        </PanelContainer>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Panel;
