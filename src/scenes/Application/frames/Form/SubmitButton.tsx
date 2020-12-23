import React from 'react';

import Button from '@components/Button/Button';
import Form from '@components/Form/Form.store';

export default () => {
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const isLoading = Form.useStoreState((store) => store.isLoading);

  return (
    <Button
      large
      primary
      className="s-signup-submit-btn"
      disabled={!isCompleted}
      loading={isLoading}
      loadingText="Submitting..."
      type="submit"
    >
      Submit Application
    </Button>
  );
};
