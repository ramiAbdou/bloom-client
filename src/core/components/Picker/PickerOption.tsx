import React, { memo } from 'react';

import Separator from '@components/Misc/Separator';
import { PickerAction } from '@components/Picker/Picker.store';
import { useStoreActions } from '@store/Store';

/**
 * Default option selection for the dropdown. Must execute some function on
 * click. Only has text showing. If customization is needed, won't be able
 * to use this component.
 */
export default memo(({ Icon, onClick, separator, text }: PickerAction) => {
  const closePicker = useStoreActions(({ picker }) => picker.closePicker);

  // After the passed-in onClick is executed, close the picker. This component
  // should not be used as a Flow. It is meant to be a one-time action picker.
  const onOptionClick = () => {
    onClick();
    setTimeout(closePicker, 0);
  };

  return (
    <>
      {separator && <Separator style={{ marginBottom: 8, marginTop: 8 }} />}
      <button className="c-picker-option" onClick={onOptionClick}>
        <Icon />
        {text}
      </button>
    </>
  );
});
