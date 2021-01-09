import React from 'react';

import { ChildrenProps, LoadingProps } from '@constants';
import LoadingContainer from '../Loading/LoadingContainer';

interface MainContentProps extends ChildrenProps, LoadingProps {
  Header?: React.FC<LoadingProps>;
}

const MainContent: React.FC<MainContentProps> = ({ children, ...props }) => {
  return (
    <LoadingContainer {...props}>
      <section className="t-main-content">{children}</section>
    </LoadingContainer>
  );
};

export default MainContent;
