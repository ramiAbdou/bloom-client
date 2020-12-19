import React, { useEffect } from 'react';

import PrimaryButton from '@components/Button/PrimaryButton';
import FormStore from '@components/Form/Form.store';
import Application from '../../Application.store';

export default () => {
  const storedEmail = Application.useStoreState((store) => store.email);
  const setEmail = Application.useStoreActions((store) => store.setEmail);
  const isCompleted = FormStore.useStoreState((store) => store.isCompleted);
  const isLoading = FormStore.useStoreState((store) => store.isLoading);

  const email = FormStore.useStoreState(
    ({ items }) =>
      items.filter(({ category }) => category === 'EMAIL')[0]?.value
  );

  useEffect(() => {
    if (email !== storedEmail) setEmail(email);
  }, [email]);

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
