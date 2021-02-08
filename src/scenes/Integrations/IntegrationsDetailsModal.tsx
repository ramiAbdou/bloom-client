import React, { useEffect } from 'react';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import QuestionValueList from '@molecules/QuestionValueList';
import Modal from '@organisms/Modal/Modal';
import { useStoreActions } from '@store/Store';
import Integrations from './Integrations.store';

export type ExpandedDetailProps = { label: string; value: any };

type ExpandedDetailsProps = {
  details: ExpandedDetailProps[];
  logo: string;
  name: string;
};

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
    showModal({ id: MODAL_ID });
  }, []);

  return (
    <Modal
      className="s-integrations-modal"
      id={MODAL_ID}
      onClose={() => setFlow(null)}
    >
      <img className="s-integrations-icon--lg" src={logo} />
      <h1>{name} Integration Details</h1>

      <QuestionValueList
        items={details.map(({ label, value }) => ({
          title: label,
          type: 'MULTIPLE_CHOICE',
          value
        }))}
        marginBottom={24}
      />

      <Row>
        <Button secondary onClick={() => closeModal()}>
          Close
        </Button>
      </Row>
    </Modal>
  );
};

export default IntegrationsDetailsModal;
