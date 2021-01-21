import React from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import LoadingHeader, {
  LoadingHeaderProps
} from '@containers/Loading/LoadingHeader';
import { cx } from '@util/util';

interface CardProps
  extends ChildrenProps,
    ClassNameProps,
    Pick<LoadingHeaderProps, 'headerTag' | 'loading' | 'title'> {
  onClick?: VoidFunction;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  headerTag,
  loading,
  onClick,
  title
}) => {
  const css = cx('t-misc-card', {
    [className]: className,
    't-misc-card--clickable': !!onClick
  });

  return (
    <div className={css} onClick={onClick}>
      {title && (
        <LoadingHeader
          h3
          headerTag={headerTag}
          loading={loading}
          title={title}
        />
      )}

      {!loading && children}
    </div>
  );
};

export default Card;
