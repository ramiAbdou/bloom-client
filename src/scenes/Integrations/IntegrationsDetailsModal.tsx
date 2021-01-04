import React, { useEffect } from 'react';

import Button from '@atoms/Button';
import Modal from '@organisms/Modal/Modal';
import { useStoreActions } from '@store/Store';
import Integrations from './Integrations.store';

export type ExpandedDetailProps = { label: string; value: any };

type ExpandedDetailsProps = {
  details: ExpandedDetailProps[];
  logo: string;
  name: string;
};

const Detail = ({ label, value }: ExpandedDetailProps) => (
  <div className="s-integrations-modal-item--detail">
    <p>{label}</p>
    <p>{value}</p>
  </div>
);

const IntegrationsDetailsModal: React.FC<ExpandedDetailsProps> = ({
  details,
  logo,
  name
}) => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const setFlow = Integrations.useStoreActions((store) => store.setFlow);

  const MODAL_ID = `${name.toUpperCase()}_DETAILS`;

  useEffect(() => {
    showModal(MODAL_ID);
  }, []);

  return (
    <Modal
      className="s-integrations-modal"
      id={MODAL_ID}
      onClose={() => setFlow(null)}
    >
      <img className="s-integrations-icon--lg" src={logo} />
      <h1>{name} Integration Details</h1>

      {details.map((props) => (
        <Detail key={props.label} {...props} />
      ))}

      <div className="s-integrations-action-ctr">
        <Button secondary onClick={() => closeModal()}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default IntegrationsDetailsModal;
