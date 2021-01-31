import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import Spinner from '@atoms/Spinner/Spinner';
import { HeaderTag } from '@atoms/Tags';
import { LoadingProps } from '@constants';

export interface LoadingHeaderProps extends LoadingProps {
  SearchBar?: React.FC;
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
  SearchBar,
  ...titleProps
}) => {
  return (
    <div className="t-loading-header">
      <div>
        <LoadingHeaderBackButton onBack={onBack} />
        <LoadingHeaderTitle {...titleProps} />
        {!loading && headerTag && <HeaderTag>{headerTag}</HeaderTag>}
        <Spinner dark loading={loading} />
      </div>

      {!!SearchBar && <SearchBar />}
    </div>
  );
};

export default LoadingHeader;
