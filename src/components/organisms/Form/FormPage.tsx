import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

import {
  ChildrenProps,
  ClassNameProps,
  IdProps,
  LoadingProps
} from '@constants';
import ConfirmationScreen from '@containers/ConfirmationScreen/ConfirmationScreen';
import { cx } from '@util/util';
import LoadingHeader from '../../containers/Loading/LoadingHeader';
import FormStore from './Form.store';

interface FormPageProps
  extends ChildrenProps,
    ClassNameProps,
    IdProps,
    LoadingProps {
  iconUrl?: string;
}

const FormPage: React.FC<FormPageProps> = ({
  children,
  className,
  id,
  iconUrl,
  loading
}) => {
  const pageId = FormStore.useStoreState((store) => store.pageId);
  const pages = FormStore.useStoreState((store) => store.pages);

  const setPageDisabled = FormStore.useStoreActions(
    (store) => store.setPageDisabled
  );

  const currentPageIndex = pages.findIndex((element) => element.id === pageId);
  const pageIndex = pages.findIndex((element) => element.id === id);
  const isSamePage = id === pageId;
  const { description, disabled, title } = pages[pageIndex] ?? {};

  useEffect(() => {
    if (pageIndex >= 0 && disabled) {
      setPageDisabled({ disabled: pageIndex > currentPageIndex, id });
    }
  }, [disabled, pageIndex, isSamePage]);

  if (!isSamePage) return null;

  const css = cx('o-form-page', { [className]: className });

  if (id === 'CONFIRMATION') {
    return (
      <ConfirmationScreen closeButton title={title}>
        <p>{description}</p>
      </ConfirmationScreen>
    );
  }

  return (
    <motion.div
      animate={{ x: 0 }}
      className={css}
      initial={{ x: 50 }}
      transition={{ duration: 0.2 }}
    >
      <div>
        {iconUrl && <img src={iconUrl} />}
        <LoadingHeader loading={loading} title={title} />
        <p>{description}</p>
      </div>

      {!loading && children}
    </motion.div>
  );
};

export default FormPage;
