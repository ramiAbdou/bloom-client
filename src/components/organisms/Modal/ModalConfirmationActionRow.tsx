import React from 'react';

import Row from '@components/containers/Row/Row';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import ModalCloseButton from '@components/organisms/Modal/ModalCloseButton';

interface ModalConfirmationActionRowProps {
  primaryLoadingText?: string;
  primaryText?: string;
}

const ModalConfirmationActionRow: React.FC<ModalConfirmationActionRowProps> = ({
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

export default ModalConfirmationActionRow;
