import React from 'react';

import { BaseProps } from '@util/constants';
import { cx } from '@util/util';
import Show from './Show';

const Section: React.FC<BaseProps> = ({ children, className, show }) => {
  const css: string = cx('mb-md', {}, className);

  return (
    <Show show={show}>
      <section className={css}>{children}</section>
    </Show>
  );
};

export default Section;
