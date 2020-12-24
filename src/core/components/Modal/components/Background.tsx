import React from 'react';

import { useStoreActions } from '@store/Store';
import { makeClass } from '@util/util';
import { ModalProps } from '../Modal.types';

/**
 * The darkish overlay that lays underneath the actual modal. Has a high
 * z-index so any clicks that hit outside of the modal content will hit this
 * background.
 */
export default ({ locked }: Pick<ModalProps, 'locked'>) => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onClick = () => !locked && closeModal();
  const css = makeClass(['c-modal-bg', [locked, 'c-modal-bg--locked']]);
  return <div key="c-modal-bg" className={css} onClick={onClick} />;
};
