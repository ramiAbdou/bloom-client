import React from 'react';

import { ChildrenProps, LoadingProps } from '@constants';

interface MainContentProps extends ChildrenProps, LoadingProps {
  Header?: React.FC<LoadingProps>;
}

const MainContent: React.FC<MainContentProps> = ({
  children,
  loading,
  Header
}) => {
  return (
    <>
      {Header && <Header loading={loading} />}
      {loading === false && (
        <section className="t-main-content">{children}</section>
      )}
    </>
  );
};

export default MainContent;
