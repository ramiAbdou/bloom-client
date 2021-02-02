import React from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import { cx } from '@util/util';

interface MainContentProps extends ChildrenProps, ClassNameProps {}

const MainContent: React.FC<MainContentProps> = ({ children, className }) => {
  const css = cx('t-main-content', { [className]: className });

  return <section className={css}>{children}</section>;
};

export default MainContent;
