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
    TitleProps {
  SearchBar?: React.FC;
}

const MainSection: React.FC<MainSectionProps> = ({
  className,
  loading,
  title,
  SearchBar,
  ...props
}) => {
  const css = cx('t-main-section', { [className]: className });

  return (
    <section className={css}>
      <LoadingContainer
        {...props}
        Header={() => (
          <LoadingHeader
            h2
            SearchBar={SearchBar}
            loading={loading}
            title={title}
          />
        )}
      />
    </section>
  );
};

export default MainSection;
