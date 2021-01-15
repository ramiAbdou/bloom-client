import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import Button from '@atoms/Button';
import { ButtonProps } from '@atoms/Button/Button';
import FormStore from './Form.store';

const FormContinueButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  const pageId = FormStore.useStoreState((store) => store.pageId);
  const pages = FormStore.useStoreState((store) => store.pages);
  const setPageId = FormStore.useStoreActions((store) => store.setPageId);

  const onClick = () => {
    const nextIndex = pages.findIndex((page) => page.id === pageId) + 1;
    const { id } = pages[nextIndex];
    setPageId(id);
  };

  return (
    <Button
      fill
      large
      primary
      className="o-form-submit--continue"
      onClick={onClick}
      {...props}
    >
      {children}
      <IoChevronForwardOutline />
    </Button>
  );
};

export default FormContinueButton;
