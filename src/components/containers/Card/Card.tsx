import React from 'react';

import { ChildrenProps, ClassNameProps, ShowProps } from '@constants';
import LoadingHeader, {
  LoadingHeaderProps
} from '@containers/LoadingHeader/LoadingHeader';
import Show from '@containers/Show';
import { cx } from '@util/util';

interface CardProps
  extends ChildrenProps,
    ClassNameProps,
    Pick<LoadingHeaderProps, 'headerTag' | 'loading' | 'title'>,
    ShowProps {
  noPadding?: boolean;
  onClick?: VoidFunction;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  headerTag,
  loading,
  noPadding,
  onClick,
  show,
  title
}) => {
  const css = cx('t-card', {
    [className]: className,
    't-card--clickable': !!onClick,
    't-card--no-padding': noPadding
  });

  return (
    <Show show={show}>
      <div className={css} onClick={onClick}>
        <LoadingHeader
          h3
          headerTag={headerTag}
          loading={loading}
          show={!!title}
          title={title}
        />

        {!loading && children}
      </div>
    </Show>
  );
};

export default Card;
