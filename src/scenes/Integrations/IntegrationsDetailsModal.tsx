import React, { useEffect } from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Row from '@containers/Row/Row';
import QuestionValueList from '@molecules/QuestionValueList';
import { useStoreActions } from '@store/Store';

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

  useEffect(() => {
    showModal({ id: ModalType.INTEGRATIONS_DETAILS, metadata: name });
  }, []);

  return (
    <>
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
    </>
  );
};

export default IntegrationsDetailsModal;
