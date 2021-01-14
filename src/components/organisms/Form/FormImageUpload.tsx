import React from 'react';

import { convertImageToBase64 } from '@util/imageUtil';
import FormStore from './Form.store';
import { FormItemProps } from './Form.types';

const FormImageUpload: React.FC<Pick<FormItemProps, 'id'>> = (queryArgs) => {
  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  const onChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const base64String = await convertImageToBase64(target.files[0]);
    updateItem({ ...queryArgs, value: base64String });
  };

  return <input accept=".png, .jpg, .jpeg" type="file" onChange={onChange} />;
};

export default FormImageUpload;
