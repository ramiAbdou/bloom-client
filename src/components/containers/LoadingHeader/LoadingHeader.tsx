import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import Spinner from '@atoms/Spinner/Spinner';
import HeaderTag from '@atoms/Tag/HeaderTag';
import { LoadingProps, ShowProps } from '@constants';
import Show from '@containers/Show';

export interface LoadingHeaderProps extends LoadingProps, ShowProps {
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
  onBack,
  loading,
  headerTag,
  show,
  ...titleProps
}) => {
  return (
    <Show show={show}>
      <header className="t-loading-header">
        <LoadingHeaderBackButton onBack={onBack} />
        <LoadingHeaderTitle {...titleProps} />
        {!loading && headerTag && <HeaderTag>{headerTag}</HeaderTag>}
        <Spinner dark show={loading} />
      </header>
    </Show>
  );
};

export default LoadingHeader;
