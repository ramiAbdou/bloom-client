import React from 'react';

import LoadingHeader, {
  LoadingHeaderProps
} from '@containers/LoadingHeader/LoadingHeader';
import Show from '@containers/Show';
import { ClassNameProps, ShowProps } from '@util/constants';
import { cx } from '@util/util';

interface CardProps
  extends ClassNameProps,
    Pick<LoadingHeaderProps, 'headerTag' | 'loading' | 'title'>,
    ShowProps {
  noPadding?: boolean;
  onClick?: VoidFunction;
}

const Card: React.FC<CardProps> = (props) => {
  const {
    children,
    className,
    headerTag,
    loading,
    noPadding,
    onClick,
    show,
    title
  } = props;

  const css: string = cx(
    't-card',
    { 't-card--clickable': !!onClick, 't-card--no-padding': noPadding },
    className
  );

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
