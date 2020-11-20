/**
 * @fileoverview Component: Mailchimp Details
 * @author Rami Abdou
 */

import React, { useEffect, useMemo } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import Modal from '@components/Modal/Modal';
import { useStoreActions, useStoreState } from '@store/Store';
import mailchimp from '../../images/mailchimp.png';
import Integrations from '../../Integrations.store';

export default () => {
  const MODAL_ID = 'MAILCHIMP_DETAILS';

  const id = useStoreState(({ modal }) => modal.id);
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  const mailchimpListId = useStoreState(
    ({ integrations }) => integrations.mailchimpListId
  );

  const mailchimpListName = useStoreState(
    ({ integrations }) => integrations.mailchimpListName
  );

  const setFlow = Integrations.useStoreActions((store) => store.setFlow);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  useEffect(() => {
    showModal({ id: MODAL_ID, onClose: () => setFlow(null) });
  }, []);

  const shouldShowModal = useMemo(() => isShowing && MODAL_ID === id, [
    isShowing,
    id === MODAL_ID
  ]);

  return (
    <Modal isShowing={shouldShowModal}>
      <img
        alt="Mailchimp Icon"
        className="s-integrations-icon--lg"
        src={mailchimp}
      />

      <h1>Mailchimp Integration Details</h1>

      <div className="s-integrations-details-item">
        <p>Audience/List Name</p>
        <p>{mailchimpListName}</p>
      </div>

      <div className="s-integrations-details-item">
        <p>Audience/List ID</p>
        <p>{mailchimpListId}</p>
      </div>

      <div className="s-integrations-action-ctr">
        <OutlineButton title="Close" onClick={() => closeModal()} />
      </div>
    </Modal>
  );
};
