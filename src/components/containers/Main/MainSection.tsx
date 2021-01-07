import React from 'react';

import {
  ChildrenProps,
  ClassNameProps,
  LoadingProps,
  TitleProps
} from '@constants';
import { cx } from '@util/util';
import LoadingHeader from '../LoadingHeader/LoadingHeader';

interface MainSectionProps
  extends ClassNameProps,
    ChildrenProps,
    LoadingProps,
    TitleProps {}

const MainSection: React.FC<MainSectionProps> = ({
  className,
  children,
  loading,
  title
}) => {
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
