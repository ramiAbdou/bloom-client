import React from 'react';

import ErrorMessage, {
  ErrorMessageProps
} from '@components/atoms/ErrorMessage';
import { useForm } from './Form.state';

/**
 * Should only be used as the ErrorMessage of the entire Form, not for any
 * individual element.
 */
const FormErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const [{ error }] = useForm();

  return <ErrorMessage {...props}>{error}</ErrorMessage>;
};

export default FormErrorMessage;
