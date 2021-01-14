import React from 'react';

import { ChildrenProps, IdProps } from '@constants';
import FormStore from './Form.store';

interface FormPage extends ChildrenProps, IdProps {
  iconUrl?: string;
}

const FormPage: React.FC<FormPage> = ({ children, id, iconUrl }) => {
  const pageId = FormStore.useStoreState((store) => store.pageId);

  const page = FormStore.useStoreState(({ pages }) =>
    pages.find((element) => element.id === id)
  );

  if (id !== pageId) return null;

  const { description, title } = page ?? {};

  return (
    <div className="o-form-page">
      <div>
        {iconUrl && <img src={iconUrl} />}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      {children}
    </div>
  );
};

export default FormPage;
