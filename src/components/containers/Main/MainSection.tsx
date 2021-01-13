import React from 'react';

import {
  ChildrenProps,
  ClassNameProps,
  LoadingProps,
  TitleProps
} from '@constants';
import { cx } from '@util/util';
import LoadingContainer from '../Loading/LoadingContainer';
import LoadingHeader from '../Loading/LoadingHeader';

interface MainSectionProps
  extends ClassNameProps,
    ChildrenProps,
    LoadingProps,
    TitleProps {}

const MainSection: React.FC<MainSectionProps> = ({
  className,
  loading,
  title,
  ...props
}) => {
  const css = cx({ [className]: className, 't-main-section': true });

  return (
    <section className={css}>
      <LoadingContainer
        {...props}
        Header={() => <LoadingHeader h3 loading={loading} title={title} />}
      />
    </section>
  );
};

export default MainSection;
