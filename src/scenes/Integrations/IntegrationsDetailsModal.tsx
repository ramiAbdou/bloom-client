import React from 'react';

import Button from '@atoms/Button/Button';
import QuestionBox from '@molecules/QuestionBox/QuestionBox';
import { useStoreActions, useStoreState } from '@store/Store';
import { QuestionType } from '@util/constants';
import useIntegrationsDetails from './useIntegrationsDetails';

const IntegrationsDetailsModal: React.FC = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const { name, logo } = useStoreState(({ modal }) => modal.metadata ?? {});
  const details = useIntegrationsDetails(name);

  return (
    <>
      <img className="br-xs s-integrations-icon--lg" src={logo} />
      <h1>{name} Integration Details</h1>

      <QuestionBox
        className="mb-md--nlc"
        items={details.map(({ label, value }) => ({
          title: label,
          type: QuestionType.MULTIPLE_CHOICE,
          value
        }))}
      />

      <Button secondary onClick={() => closeModal()}>
        Close
      </Button>
    </>
  );
};

export default IntegrationsDetailsModal;
