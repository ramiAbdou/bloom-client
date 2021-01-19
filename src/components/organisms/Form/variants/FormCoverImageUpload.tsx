import React, { useRef } from 'react';

import Button from '@atoms/Button';
import { convertImageToBase64 } from '@util/imageUtil';
import FormStore from '../Form.store';
import { FormItemProps } from '../Form.types';

const FormCoverImageUpload: React.FC<Pick<FormItemProps, 'id' | 'title'>> = (
  args
) => {
  const { id, title } = args;

  const selectedImage = FormStore.useStoreState(
    ({ getItem }) => getItem(args)?.value
  );

  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  const ref: React.MutableRefObject<HTMLInputElement> = useRef(null);

  // Opens the file uploader by "clicking" the invisible file input tag.
  const openFileUploader = () => ref.current.click();

  const onChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const base64String = await convertImageToBase64({
      content: target.files[0],
      dims: [600, 300]
    });

    updateItem({ id, value: base64String });
  };

  // The background blend creates the overlay effect. Makes the background
  // darker so that white <Camera /> component shows clearly.
  const backgroundStyle: React.CSSProperties = selectedImage
    ? { backgroundImage: `url(${selectedImage})` }
    : {};

  return (
    <button
      className="o-form-item--cover-image"
      style={backgroundStyle}
      onClick={openFileUploader}
    >
      <input
        ref={ref}
        accept=".png, .jpg, .jpeg"
        type="file"
        onChange={onChange}
      />

      {!selectedImage && (
        <p>
          For best results, upload image with an aspect ratio of 2:1
          (width:height).
        </p>
      )}

      <Button secondary white onClick={openFileUploader}>
        {title}
      </Button>
    </button>
  );
};

export default FormCoverImageUpload;
