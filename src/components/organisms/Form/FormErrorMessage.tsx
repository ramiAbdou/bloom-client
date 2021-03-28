import React from 'react';

import ErrorMessage, { ErrorMessageProps } from '@atoms/ErrorMessage';
import FormStore from './Form.store';

/**
 * Should only be used as the ErrorMessage of the entire Form, not for any
 * individual element.
 */
const FormErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const error = FormStore.useStoreState((state) => {
    return state.error;
  });

  return <ErrorMessage {...props}>{error}</ErrorMessage>;
};

export default FormErrorMessage;
