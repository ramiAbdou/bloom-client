import React from 'react';

import { ClassNameProps, ShowProps } from '@constants';
import Show from '@containers/Show';
import { cx } from '@util/util';

interface MainSectionProps extends ClassNameProps, ShowProps {}

const MainSection: React.FC<MainSectionProps> = ({
  children,
  className,
  show
}) => {
  const css = cx('t-main-section', { [className]: className });

  return (
    <Show show={show}>
      <section className={css}>{children}</section>
    </Show>
  );
};

export default MainSection;
