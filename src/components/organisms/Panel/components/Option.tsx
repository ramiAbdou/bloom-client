import React from 'react';

import { useStoreActions } from '@store/Store';
import { PanelAction } from '../Panel.types';

/**
 * Default option selection for the dropdown. Must execute some function on
 * click. Only has text showing. If customization is needed, won't be able
 * to use this component.
 */
const PanelOption = ({ Icon, onClick, text }: PanelAction) => {
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);

  // After the passed-in onClick is executed, close the picker. This component
  // should not be used as a Flow. It is meant to be a one-time action picker.
  const onOptionClick = () => {
    if (onClick) onClick();
    setTimeout(closePanel, 0);
  };

  return (
    <button className="c-panel-option" onClick={onOptionClick}>
      <Icon />
      {text}
    </button>
  );
};

export default PanelOption;
