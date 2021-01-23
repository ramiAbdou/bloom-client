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
  title
}) => {
  const css = cx('t-misc-card', {
    [className]: className,
    't-misc-card--clickable': !!onClick,
    't-misc-card--no-padding': noPadding
  });

  const body = (
    <>
      {title && (
        <LoadingHeader
          h3
          headerTag={headerTag}
          loading={loading}
          title={title}
        />
      )}
      {!loading && children}
    </>
  );

  return (
    <div className={css} onClick={onClick}>
      {body}
    </div>
  );
};

export default Card;
