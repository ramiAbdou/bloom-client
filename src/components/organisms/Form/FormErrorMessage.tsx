import React from 'react';

import ErrorMessage, { ErrorMessageProps } from '@atoms/ErrorMessage';
import Form from './Form.store';

/**
 * Should only be used as the ErrorMessage of the entire Form, not for any
 * individual element.
 */
const FormErrorMessage: React.FC<Omit<ErrorMessageProps, 'message'>> = (
  props
) => {
  const errorMessage = Form.useStoreState((store) => store.errorMessage);
  return <ErrorMessage {...props}>{errorMessage}</ErrorMessage>;
};

export default FormErrorMessage;
