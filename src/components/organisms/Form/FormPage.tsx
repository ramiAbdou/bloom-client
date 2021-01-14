import React from 'react';

import { ChildrenProps, IdProps } from '@constants';
import FormStore from './Form.store';

interface FormPage extends ChildrenProps, IdProps {}

const FormPage: React.FC<FormPage> = ({ children, id }) => {
  const page = FormStore.useStoreState(({ pages }) =>
    pages.find((element) => element.id === id)
  );

  const { description, title } = page ?? {};

  return (
    <div className="o-form-page">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      {children}
    </div>
  );
};

export default FormPage;
