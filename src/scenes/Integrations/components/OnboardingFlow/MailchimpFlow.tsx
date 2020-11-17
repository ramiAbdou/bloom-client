/**
 * @fileoverview Component: Mailchimp Flow
 * @author Rami Abdou
 */

import React, { useEffect, useMemo } from 'react';

import Modal from '@components/Modal/Modal';
import { ModalScreen } from '@components/Modal/Modal.store';
import { useStoreActions, useStoreState } from '@store/Store';

export default () => {
  const FLOW_ID = 'MAILCHIMP-FLOW';

  const id = useStoreState(({ modal }) => modal.id);
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  useEffect(() => {
    const screens: ModalScreen[] = [
      { node: <h1>Integrate with Mailchimp</h1> }
    ];
    showModal({ id: FLOW_ID, screens });
  }, []);

  const shouldShowModal = useMemo(() => isShowing && FLOW_ID === id, [
    isShowing,
    id === FLOW_ID
  ]);

  return <Modal isShowing={shouldShowModal} />;
};
