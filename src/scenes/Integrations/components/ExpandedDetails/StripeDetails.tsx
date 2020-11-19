/**
 * @fileoverview Component: Mailchimp Details
 * @author Rami Abdou
 */

import React, { useEffect, useMemo } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import Modal from '@components/Modal/Modal';
import { useStoreActions, useStoreState } from '@store/Store';
import stripe from '../../images/stripe.png';
import Integrations from '../../Integrations.store';

export default () => {
  const FLOW_ID = 'STRIPE_DETAILS';

  const id = useStoreState(({ modal }) => modal.id);
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  const stripeAccountId = useStoreState(
    ({ integrations }) => integrations.stripeAccountId
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
      <img alt="Stripe Icon" className="s-integrations-icon--lg" src={stripe} />
      <h1>Stripe Integration Details</h1>

      <div className="s-integrations-details-item">
        <p>Account ID</p>
        <p>{stripeAccountId}</p>
      </div>

      <div className="s-integrations-action-ctr">
        <OutlineButton title="Close" onClick={() => closeModal()} />
      </div>
    </Modal>
  );
};
