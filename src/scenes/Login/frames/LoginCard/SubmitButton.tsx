import React from 'react';

import Button from '@components/Button/Button';
import Form from '@components/Form/Form.store';

export default () => {
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const isLoading = Form.useStoreState((store) => store.isLoading);

  return (
    <Button
      fill
      large
      primary
      disabled={!isCompleted}
      loading={isLoading}
      loadingText="Sending..."
      type="submit"
    >
      Send Login Link
    </Button>
  );
};
