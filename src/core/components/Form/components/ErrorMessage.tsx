import React from 'react';

import ErrorMessage, { ErrorMessageProps } from '@components/Misc/ErrorMessage';
import Form from '../Form.store';

/**
 * Should only be used as the ErrorMessage of the entire Form, not for any
 * individual element.
 */
export default (props: Omit<ErrorMessageProps, 'message'>) => {
  const errorMessage = Form.useStoreState((store) => store.errorMessage);
  return <ErrorMessage message={errorMessage} {...props} />;
};
