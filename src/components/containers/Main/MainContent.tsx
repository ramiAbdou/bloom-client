import React from 'react';

import { ChildrenProps } from '@constants';
import LoadingStore from '@store/Loading.store';

const MainContent: React.FC<ChildrenProps> = ({ children }) => {
  const loading = LoadingStore.useStoreState((store) => store.loading);
  console.log('MAIN CONTENT');
  if (loading !== false) return null;
  return <section className="t-main-content">{children}</section>;
};

export default MainContent;
