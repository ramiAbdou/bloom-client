import React from 'react';

import Show from '@containers/Show';
import { ClassNameProps, ShowProps } from '@util/constants';
import { cx } from '@util/util';

interface MainSectionProps extends ClassNameProps, ShowProps {}

const MainSection: React.FC<MainSectionProps> = (props) => {
  const { children, className, show } = props;
  const css: string = cx('mb-md', {}, className);

  return (
    <Show show={show}>
      <section className={css}>{children}</section>
    </Show>
  );
};

export default MainSection;
