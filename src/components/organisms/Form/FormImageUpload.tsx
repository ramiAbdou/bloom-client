import React from 'react';

import { convertImageToBase64 } from '@util/imageUtil';

const FormImageUpload: React.FC = () => {
  const onChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const base64String = await convertImageToBase64(target.files[0]);
    console.log(base64String);
  };

  return <input accept=".png, .jpg, .jpeg" type="file" onChange={onChange} />;
};

export default FormImageUpload;
