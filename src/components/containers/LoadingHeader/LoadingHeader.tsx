import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import Spinner from '@atoms/Spinner/Spinner';
import HeaderTag from '@atoms/Tag/HeaderTag';
import Show from '@containers/Show';
import { BaseProps, LoadingProps } from '@util/constants';
import { cx } from '@util/util';

export interface LoadingHeaderProps extends BaseProps, LoadingProps {
  h2?: boolean;
  h3?: boolean;
  onBack?: VoidFunction;
  headerTag?: string;
  title?: string;
}

const LoadingHeaderBackButton: React.FC<Pick<LoadingHeaderProps, 'onBack'>> = ({
  onBack
}) => {
  return (
    <Show show={!!onBack}>
      <Button onClick={onBack}>
        <IoArrowBack />
      </Button>
    </Show>
  );
};

const LoadingHeaderTitle: React.FC<
  Pick<LoadingHeaderProps, 'h2' | 'h3' | 'title'>
> = ({ h2, h3, title }) => {
  return (
    <>
      {!h2 && !h3 && title && <h1>{title}</h1>}
      {h2 && <h2>{title}</h2>}
      {h3 && <h3>{title}</h3>}
    </>
  );
};

const LoadingHeader: React.FC<LoadingHeaderProps> = ({
  className,
  onBack,
  loading,
  headerTag,
  show,
  ...titleProps
}) => {
  if (show === false) return null;

  const css = cx('t-loading-header', {}, className);

  return (
    <header className={css}>
      <LoadingHeaderBackButton onBack={onBack} />
      <LoadingHeaderTitle {...titleProps} />
      {!loading && headerTag && <HeaderTag>{headerTag}</HeaderTag>}
      <Spinner dark show={loading} />
    </header>
  );
};

export default LoadingHeader;
