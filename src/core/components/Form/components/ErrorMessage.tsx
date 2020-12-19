import React from 'react';

import ErrorMessage, { ErrorMessageProps } from '@components/Misc/ErrorMessage';
import Form from '../Form.store';

export default (props: Omit<ErrorMessageProps, 'message'>) => {
  const errorMessage = Form.useStoreState((store) => store.errorMessage);
  return <ErrorMessage message={errorMessage} {...props} />;
};
