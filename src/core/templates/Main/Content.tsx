import React from 'react';

import { ChildrenProps, LoadingProps } from '@constants';

interface MainContentProps extends ChildrenProps, LoadingProps {}

const MainContent = ({ children, loading }: MainContentProps) => {
  if (loading) return null;
  return <section className="c-main-content">{children}</section>;
};

export default MainContent;
