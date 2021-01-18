import React, { useRef } from 'react';
import { IoCamera } from 'react-icons/io5';

import Button from '@atoms/Button';
import { convertImageToBase64 } from '@util/imageUtil';
import FormStore from '../Form.store';
import { FormItemProps } from '../Form.types';

const FormImageUpload: React.FC<Pick<FormItemProps, 'id'>> = (queryArgs) => {
  const selectedImage = FormStore.useStoreState(
    ({ getItem }) => getItem(queryArgs)?.value
  );

  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  const ref: React.MutableRefObject<HTMLInputElement> = useRef(null);

  // Opens the file uploader by "clicking" the invisible file input tag.
  const openFileUploader = () => ref.current.click();

  const onChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const base64String = await convertImageToBase64(target.files[0]);
    updateItem({ ...queryArgs, value: base64String });
  };

  // The background blend creates the overlay effect. Makes the background
  // darker so that white <Camera /> component shows clearly.
  const backgroundStyle: React.CSSProperties = selectedImage
    ? {
        backgroundBlendMode: 'multiply',
        backgroundColor: 'var(--gray-4)',
        backgroundImage: `url(${selectedImage})`
      }
    : { backgroundColor: 'var(--gray-4)' };

  return (
    <>
      <input
        ref={ref}
        accept=".png, .jpg, .jpeg"
        type="file"
        onChange={onChange}
      />

      <Button style={backgroundStyle} onClick={openFileUploader}>
        <IoCamera />
      </Button>
    </>
  );
};

export default FormImageUpload;
