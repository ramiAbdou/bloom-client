import React from 'react';

import SubmitButton from '@components/Form/components/SubmitButton';
import Form from '@components/Form/Form.store';

export default () => {
  const isLoading = Form.useStoreState((store) => store.isLoading);

  return (
    <SubmitButton
      className="s-signup-submit-btn"
      loading={isLoading}
      loadingText="Submitting..."
    >
      Submit Application
    </SubmitButton>
  );
};
