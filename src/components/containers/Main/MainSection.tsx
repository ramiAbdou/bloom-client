import React from 'react';

import { ChildrenProps, ClassNameProps, TitleProps } from '@constants';
import LoadingStore from '@store/Loading.store';
import { cx } from '@util/util';
import LoadingHeader from '../LoadingHeader/LoadingHeader';

interface MainSectionProps extends ClassNameProps, ChildrenProps, TitleProps {}

const MainSection: React.FC<MainSectionProps> = ({
  className,
  children,
  title
}) => {
  const loading = LoadingStore.useStoreState((store) => store.loading);
  if (loading === null || loading) return null;

  const css = cx({ [className]: className, 't-main-section': true });

  return (
    <section className={css}>
      <LoadingHeader loading={loading}>
        <h3>{title}</h3>
      </LoadingHeader>

      {loading === false && children}
    </section>
  );
};

export default MainSection;
