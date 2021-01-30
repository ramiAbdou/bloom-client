import React from 'react';

import { ChildrenProps } from '@constants';

interface ShowProps extends ChildrenProps {
  show?: boolean;
}

const Show: React.FC<ShowProps> = ({ children, show }) => {
  if (show === false) return null;
  return <>{children}</>;
};

export default Show;
