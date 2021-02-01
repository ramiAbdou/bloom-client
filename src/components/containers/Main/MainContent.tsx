import React from 'react';

import { ChildrenProps, ClassNameProps, LoadingProps } from '@constants';
import NavHamburgerContainer from '@organisms/Nav/NavHamburgerContainer';
import { cx } from '@util/util';
import LoadingContainer from '../Loading/LoadingContainer';

interface MainContentProps extends ChildrenProps, ClassNameProps, LoadingProps {
  Header?: React.FC<LoadingProps>;
}

const MainContent: React.FC<MainContentProps> = ({
  children,
  className,
  ...props
}) => {
  const css = cx('t-main-content', { [className]: className });

  return (
    <>
      <NavHamburgerContainer />

      <LoadingContainer {...props}>
        <section className={css}>{children}</section>
      </LoadingContainer>
    </>
  );
};

export default MainContent;
