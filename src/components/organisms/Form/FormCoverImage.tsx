import React, { useRef } from 'react';

import Button from '@components/atoms/Button/Button';
import Aspect from '@components/containers/Aspect/Aspect';
import Network from '@components/images/network.svg';
import { getFormItemKey } from '@components/organisms/Form/Form.util';
import { convertImageToBase64 } from '@util/imageUtil';
import { useForm, useFormItem } from './Form.state';
import { FormItemData } from './Form.types';
import useInitFormItem from './useInitFormItem';

const FormCoverImageContent: React.FC<FormItemData> = (args) => {
  const [, formDispatch] = useForm();

  const key: string = getFormItemKey(args);
  const ref: React.MutableRefObject<HTMLInputElement> = useRef(null);
  // Opens the file uploader by "clicking" the invisible file input tag.
  const openFileUploader = () => ref.current.click();

  const onChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files[0];

    const base64String = await convertImageToBase64({
      content: file,
      dims: [600, 300]
    });

    formDispatch({ key, type: 'SET_VALUE', value: base64String });
  };

  return (
    <>
      <input
        ref={ref}
        accept=".png, .jpg, .jpeg"
        type="file"
        onChange={onChange}
      />

      <Button secondary onClick={openFileUploader}>
        {args.title}
      </Button>
    </>
  );
};

const FormCoverImageMessage: React.FC = () => (
  <p className="meta">
    Note: For best results, upload image with an aspect ratio of 2:1 (width :
    height).
  </p>
);

const FormCoverImage: React.FC<FormItemData> = (args) => {
  const key: string = getFormItemKey(args);
  const selectedImage: string = useFormItem(key)?.value as string;

  useInitFormItem(args);

  // The background blend creates the overlay effect. Makes the background
  // darker so that white <Camera /> component shows clearly.
  const backgroundStyle: React.CSSProperties = selectedImage
    ? { backgroundImage: `url(${selectedImage})` }
    : {};

  return (
    <div className="o-form-item">
      <Aspect
        className="o-form-item--cover-image"
        ratio={2}
        style={backgroundStyle}
      >
        {!selectedImage && <div />}
        {!selectedImage && <Network />}
        <FormCoverImageContent {...args} />
      </Aspect>

      <FormCoverImageMessage />
    </div>
  );
};

export default FormCoverImage;
