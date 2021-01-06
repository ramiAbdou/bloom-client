import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

import Button from '@atoms/Button';
import Spinner from '@atoms/Spinner';
import { ChildrenProps, LoadingProps } from '@constants';

interface LoadingHeaderProps extends ChildrenProps, LoadingProps {
  onBackButtonClick?: VoidFunction;
  title?: string;
}

const LoadingHeaderBackButton: React.FC<
  Pick<LoadingHeaderProps, 'onBackButtonClick'>
> = ({ onBackButtonClick }) => {
  if (!onBackButtonClick) return null;

  return (
    <Button onClick={onBackButtonClick}>
      <IoArrowBack />
    </Button>
  );
};

const LoadingHeader = ({
  onBackButtonClick,
  children,
  loading,
  title
}: LoadingHeaderProps) => {
  return (
    <div className="c-loading-header">
      <LoadingHeaderBackButton onBackButtonClick={onBackButtonClick} />
      {!children && <h1>{title}</h1>}
      {children}
      <Spinner dark loading={loading} />
    </div>
  );
};

export default LoadingHeader;
