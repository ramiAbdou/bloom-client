import React from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import LoadingHeader, {
  LoadingHeaderProps
} from '@containers/Loading/LoadingHeader';
import { cx } from '@util/util';

interface CardProps
  extends ChildrenProps,
    ClassNameProps,
    Pick<LoadingHeaderProps, 'loading' | 'title'> {
  onClick?: VoidFunction;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  loading,
  onClick,
  title
}) => {
  const css = cx({ [className]: className, 't-misc-card': true });

  return (
    <div className={css} onClick={onClick}>
      {title && <LoadingHeader h3 loading={loading} title={title} />}
      {!loading && children}
    </div>
  );
};

export default Card;
