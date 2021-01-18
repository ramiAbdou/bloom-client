import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

import { ChildrenProps, ClassNameProps, IdProps } from '@constants';
import { cx } from '@util/util';
import FormStore from './Form.store';

interface FormPageProps extends ChildrenProps, ClassNameProps, IdProps {
  iconUrl?: string;
}

const FormPage: React.FC<FormPageProps> = ({
  children,
  className,
  id,
  iconUrl
}) => {
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

  const css = cx('o-form-page', { [className]: className });

  return (
    <motion.div
      animate={{ x: 0 }}
      className={css}
      initial={{ x: 50 }}
      transition={{ duration: 0.2 }}
    >
      <div>
        {iconUrl && <img src={iconUrl} />}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      {children}
    </motion.div>
  );
};

export default FormPage;
