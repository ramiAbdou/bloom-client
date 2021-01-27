import React from 'react';

import FormStore from '@organisms/Form/Form.store';
import FormPage from '@organisms/Form/FormPage';
import CheckInLoginContent from './CheckInLoginContent';

const CheckInFinishPage: React.FC = () => {
  const pageId = FormStore.useStoreState((store) => store.pageId);

  const metadata = pageId?.includes('FINISH')
    ? pageId.slice(pageId.indexOf('-') + 1)
    : '';

  return (
    <FormPage id={`FINISH-${metadata ?? 'YES'}`}>
      <CheckInLoginContent />
    </FormPage>
  );
};

export default CheckInFinishPage;
