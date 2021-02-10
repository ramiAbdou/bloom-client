import React from 'react';

import { ClassNameProps } from '@constants';
import { cx } from '@util/util';

const MainContent: React.FC<ClassNameProps> = ({ children, className }) => {
  const css = cx('t-main-content', { [className]: className });

  return <section className={css}>{children}</section>;
};

export default MainContent;
