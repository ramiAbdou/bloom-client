import React from 'react';

import Button from '@atoms/Button/Button';
import { QuestionType } from '@constants';
import QuestionValueList from '@molecules/QuestionValueList';
import { useStoreActions, useStoreState } from '@store/Store';
import useIntegrationsDetails from './useIntegrationsDetails';

const IntegrationsDetailsModal: React.FC = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const { name, logo } = useStoreState(({ modal }) => modal.metadata ?? {});
  const details = useIntegrationsDetails(name);

  return (
    <>
      <img className="s-integrations-icon--lg" src={logo} />
      <h1>{name} Integration Details</h1>

      <QuestionValueList
        items={details.map(({ label, value }) => ({
          title: label,
          type: QuestionType.MULTIPLE_CHOICE,
          value
        }))}
        marginBottom={24}
      />

      <Button secondary onClick={() => closeModal()}>
        Close
      </Button>
    </>
  );
};

export default IntegrationsDetailsModal;
