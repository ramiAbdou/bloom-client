/**
 * @fileoverview Component: Mailchimp Details
 * @author Rami Abdou
 */

import React, { useEffect, useMemo } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import Modal from '@components/Modal/Modal';
import { useStoreActions, useStoreState } from '@store/Store';
import zoom from '../../images/zoom.svg';
import Integrations from '../../Integrations.store';

export default () => {
  const FLOW_ID = 'ZOOM_DETAILS';

  const id = useStoreState(({ modal }) => modal.id);
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  const zoomEmail = useStoreState(
    ({ integrations }) => integrations.zoomAccountInfo?.email
  );

  const zoomPmi = useStoreState(
    ({ integrations }) => integrations.zoomAccountInfo?.pmi
  );

  const zoomUserId = useStoreState(
    ({ integrations }) => integrations.zoomAccountInfo?.userId
  );

  const setFlow = Integrations.useStoreActions((store) => store.setFlow);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  useEffect(() => {
    showModal({ id: FLOW_ID, onClose: () => setFlow(null) });
  }, []);

  const shouldShowModal = useMemo(() => isShowing && FLOW_ID === id, [
    isShowing,
    id === FLOW_ID
  ]);

  return (
    <Modal isShowing={shouldShowModal}>
      <img alt="Zoom Icon" className="s-integrations-icon--lg" src={zoom} />
      <h1>Zoom Integration Details</h1>

      <div className="s-integrations-details-item">
        <p> Associated Email</p>
        <p>{zoomEmail}</p>
      </div>

      <div className="s-integrations-details-item">
        <p>Personal Meeting ID</p>
        <p>{zoomPmi}</p>
      </div>

      <div className="s-integrations-details-item">
        <p>User ID</p>
        <p>{zoomUserId}</p>
      </div>

      <div className="s-integrations-action-ctr">
        <OutlineButton title="Close" onClick={() => closeModal()} />
      </div>
    </Modal>
  );
};
