import React from 'react';

import { ChildrenProps, LoadingProps } from '@constants';

export interface LoadingContainerProps extends ChildrenProps, LoadingProps {
  Header?: React.FC<LoadingProps>;
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({
  children,
  loading,
  Header
}) => {
  return (
    <>
      {Header && <Header loading={loading} />}
      {!loading && children}
    </>
  );
};

export default LoadingContainer;
