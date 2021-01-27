import React from 'react';

import { ShowProps } from '@constants';
import Row from '@containers/Row/Row';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';

const CheckInPublicForm: React.FC<ShowProps> = ({ show }) => {
  if (show === false) return null;

  return (
    <div>
      <Row equal spacing="xs">
        <FormItem
          required
          category="FIRST_NAME"
          title="First Name"
          type="SHORT_TEXT"
        />

        <FormItem
          required
          category="LAST_NAME"
          title="Last Name"
          type="SHORT_TEXT"
        />
      </Row>

      <FormItem required category="EMAIL" title="Email" type="SHORT_TEXT" />

      <FormSubmitButton>Finish Checking-In</FormSubmitButton>
    </div>
  );
};

export default CheckInPublicForm;
