import React from 'react';

import { ClassNameProps } from '@util/constants';
import { cx } from '@util/util';

const MainContent: React.FC<ClassNameProps> = ({ children, className }) => {
  const css: string = cx('t-main-content', {}, className);
  return <section className={css}>{children}</section>;
};

export default MainContent;
