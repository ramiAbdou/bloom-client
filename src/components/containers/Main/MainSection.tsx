import React from 'react';

import Show from '@containers/Show';
import { ClassNameProps, ShowProps } from '@util/constants';
import { cx } from '@util/util';

interface MainSectionProps extends ClassNameProps, ShowProps {}

const MainSection: React.FC<MainSectionProps> = ({
  children,
  className,
  show
}) => {
  const css: string = cx('t-main-section mb-md--nlc', {}, className);

  return (
    <Show show={show}>
      <section className={css}>{children}</section>
    </Show>
  );
};

export default MainSection;
