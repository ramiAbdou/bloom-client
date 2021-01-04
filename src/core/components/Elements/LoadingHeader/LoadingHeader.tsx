import React from 'react';

import Spinner from '@atoms/Spinner';
import { ChildrenProps, LoadingProps } from '@constants';

interface LoadingHeaderProps extends ChildrenProps, LoadingProps {
  dark?: boolean;
  title?: string;
}

const LoadingHeader = ({
  children,
  dark,
  loading,
  title
}: LoadingHeaderProps) => {
  return (
    <div className="c-loading-header">
      {!children && <h1>{title}</h1>}
      {children}
      <Spinner dark={dark ?? true} loading={loading} />
    </div>
  );
};

export default LoadingHeader;
