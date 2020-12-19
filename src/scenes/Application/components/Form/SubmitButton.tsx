import React from 'react';

import PrimaryButton from '@components/Button/PrimaryButton';
import Form from '@components/Form/Form.store';

export default () => {
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const isLoading = Form.useStoreState((store) => store.isLoading);

  return (
    <PrimaryButton
      large
      className="s-signup-submit-btn"
      disabled={!isCompleted}
      loading={isLoading}
      loadingText="Submitting..."
      type="submit"
    >
      Submit Application
    </PrimaryButton>
  );
};
