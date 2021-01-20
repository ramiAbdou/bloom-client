import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

import Button from '@atoms/Button';
import Spinner from '@atoms/Spinner';
import { HeaderTag } from '@atoms/Tags';
import { LoadingProps } from '@constants';

export interface LoadingHeaderProps extends LoadingProps {
  h2?: boolean;
  h3?: boolean;
  onBack?: VoidFunction;
  headerTag?: string;
  title?: string;
}

const LoadingHeaderBackButton: React.FC<Pick<LoadingHeaderProps, 'onBack'>> = ({
  onBack
}) => {
  if (!onBack) return null;

  return (
    <Button onClick={onBack}>
      <IoArrowBack />
    </Button>
  );
};

const LoadingHeader: React.FC<LoadingHeaderProps> = ({
  onBack,
  h2,
  h3,
  loading,
  headerTag,
  title
}) => {
  return (
    <div className="t-loading-header">
      <LoadingHeaderBackButton onBack={onBack} />
      {!h2 && !h3 && <h1>{title}</h1>}
      {h2 && <h2>{title}</h2>}
      {h3 && <h3>{title}</h3>}
      {loading === false && headerTag && <HeaderTag>{HeaderTag}</HeaderTag>}
      <Spinner dark loading={loading} />
    </div>
  );
};

export default LoadingHeader;
