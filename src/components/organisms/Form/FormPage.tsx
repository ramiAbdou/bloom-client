import React, { useEffect } from 'react';

import { ChildrenProps, IdProps } from '@constants';
import FormStore from './Form.store';

interface FormPageProps extends ChildrenProps, IdProps {
  iconUrl?: string;
}

const FormPage: React.FC<FormPageProps> = ({ children, id, iconUrl }) => {
  const pageId = FormStore.useStoreState((store) => store.pageId);
  const pages = FormStore.useStoreState((store) => store.pages);

  const currentPageIndex = pages.findIndex((element) => element.id === pageId);
  const pageIndex = pages.findIndex((element) => element.id === id);
  const { description, disabled, title } = pages[pageIndex] ?? {};

  const setPageDisabled = FormStore.useStoreActions(
    (store) => store.setPageDisabled
  );

  const isSamePage = id === pageId;

  useEffect(() => {
    if (pageIndex >= 0 && disabled) {
      setPageDisabled({ disabled: pageIndex > currentPageIndex, id });
    }
  }, [disabled, pageIndex, isSamePage]);

  if (!isSamePage) return null;

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
