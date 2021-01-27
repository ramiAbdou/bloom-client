import React from 'react';

import FormStore from '@organisms/Form/Form.store';
import FormPage from '@organisms/Form/FormPage';
import CheckInGuestForm from './CheckInGuestForm';
import CheckInLoginContent from './CheckInLoginContent';

const CheckInFinishPage: React.FC = () => {
  const pageId = FormStore.useStoreState((store) => store.pageId);

  const metadata = pageId?.includes('FINISH')
    ? pageId.slice(pageId.indexOf('-') + 1)
    : '';

  return (
    <FormPage id={`FINISH-${metadata ?? 'YES'}`}>
      <CheckInLoginContent show={metadata === 'YES'} />
      <CheckInGuestForm show={metadata === 'NO'} />
    </FormPage>
  );
};

export default CheckInFinishPage;
