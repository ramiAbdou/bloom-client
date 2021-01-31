import React, { useRef } from 'react';
import { IoCamera } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { convertImageToBase64 } from '@util/imageUtil';
import FormStore from './Form.store';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';
import useInitFormItem from './useInitFormItem';

const FormImage: React.FC<FormItemData> = (args) => {
  const key = getFormItemKey(args);
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  useInitFormItem(args);
  const ref: React.MutableRefObject<HTMLInputElement> = useRef(null);

  // Opens the file uploader by "clicking" the invisible file input tag.
  const openFileUploader = () => ref.current.click();

  const onChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const base64String = await convertImageToBase64({
      content: target.files[0],
      dims: [400, 400]
    });

    updateItem({ ...args, value: base64String });
  };

  // The background blend creates the overlay effect. Makes the background
  // darker so that white <Camera /> component shows clearly.
  const backgroundStyle: React.CSSProperties = value
    ? {
        backgroundBlendMode: 'multiply',
        backgroundColor: 'var(--gray-4)',
        backgroundImage: `url(${value})`
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

export default FormImage;
