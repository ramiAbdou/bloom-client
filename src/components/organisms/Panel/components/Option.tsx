import React, { memo } from 'react';

import Separator from '@atoms/Separator';
import { useStoreActions } from '@store/Store';
import { PanelAction } from '../Panel.types';

/**
 * Default option selection for the dropdown. Must execute some function on
 * click. Only has text showing. If customization is needed, won't be able
 * to use this component.
 */
export default memo(({ Icon, onClick, separator, text }: PanelAction) => {
  const closePicker = useStoreActions(({ panel }) => panel.closePicker);

  // After the passed-in onClick is executed, close the picker. This component
  // should not be used as a Flow. It is meant to be a one-time action picker.
  const onOptionClick = () => {
    if (onClick) onClick();
    setTimeout(closePicker, 0);
  };

  return (
    <>
      {separator && <Separator style={{ marginBottom: 8, marginTop: 8 }} />}
      <button className="c-panel-option" onClick={onOptionClick}>
        <Icon />
        {text}
      </button>
    </>
  );
});
