/**
 * @fileoverview Component: Expanded Details
 * @author Rami Abdou
 */

import React, { memo, useEffect } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import Modal from '@components/Modal/Modal';
import { useStoreActions, useStoreState } from '@store/Store';
import Integrations from '../../Integrations.store';

export type ExpandedDetailProps = { label: string; value: any };

type ExpandedDetailsProps = {
  details: ExpandedDetailProps[];
  logo: string;
  name: string;
};

const Detail = memo(({ label, value }: ExpandedDetailProps) => (
  <div className="s-integrations-details-item">
    <p>{label}</p>
    <p>{value}</p>
  </div>
));

export default ({ details, logo, name }: ExpandedDetailsProps) => {
  const id = useStoreState(({ modal }) => modal.id);
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const setFlow = Integrations.useStoreActions((store) => store.setFlow);

  const modalId = `${name.toUpperCase()}_DETAILS`;

  useEffect(() => {
    showModal({ id: modalId, onClose: () => setFlow(null) });
  }, []);

  return (
    <Modal isShowing={isShowing && modalId === id}>
      <img className="s-integrations-icon--lg" src={logo} />
      <h1>{name} Integration Details</h1>

      {details.map((props) => (
        <Detail key={props.label} {...props} />
      ))}

      <div className="s-integrations-action-ctr">
        <OutlineButton title="Close" onClick={() => closeModal()} />
      </div>
    </Modal>
  );
};
