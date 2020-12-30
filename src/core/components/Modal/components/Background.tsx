import React from 'react';

import { useStoreActions } from '@store/Store';

/**
 * The darkish overlay that lays underneath the actual modal. Has a high
 * z-index so any clicks that hit outside of the modal content will hit this
 * background.
 */
export default () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onClick = () => closeModal();
  return <div key="c-modal-bg" className="c-modal-bg" onClick={onClick} />;
};
