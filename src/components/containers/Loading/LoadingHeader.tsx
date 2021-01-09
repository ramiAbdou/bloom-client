import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

import Button from '@atoms/Button';
import Spinner from '@atoms/Spinner';
import { NumberTag } from '@atoms/Tags';
import { LoadingProps } from '@constants';

interface LoadingHeaderProps extends LoadingProps {
  h3?: boolean;
  onBack?: VoidFunction;
  numberTag?: string;
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

const LoadingHeader = ({
  onBack,
  h3,
  loading,
  numberTag,
  title
}: LoadingHeaderProps) => {
  return (
    <div className="t-loading-header">
      <LoadingHeaderBackButton onBack={onBack} />
      {!h3 && <h1>{title}</h1>}
      {h3 && <h3>{title}</h3>}
      {loading === false && numberTag && <NumberTag>{numberTag}</NumberTag>}
      <Spinner dark loading={loading} />
    </div>
  );
};

export default LoadingHeader;
