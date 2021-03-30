import React from 'react';

import Row from '@containers/Row/Row';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import ModalCloseButton from '@organisms/Modal/ModalCloseButton';

interface ModalConfirmationActionsProps {
  primaryLoadingText?: string;
  primaryText?: string;
}

const ModalConfirmationActions: React.FC<ModalConfirmationActionsProps> = ({
  primaryLoadingText,
  primaryText
}) => (
  <Row spacing="xs">
    <FormSubmitButton row loadingText={primaryLoadingText ?? 'Confirming...'}>
      {primaryText ?? 'Confirm'}
    </FormSubmitButton>

    <ModalCloseButton />
  </Row>
);

export default ModalConfirmationActions;
