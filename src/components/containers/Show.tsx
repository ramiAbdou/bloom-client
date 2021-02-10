import React from 'react';

interface ShowProps {
  show?: boolean;
}

const Show: React.FC<ShowProps> = ({ children, show }) => {
  if (show === false) return null;
  return <>{children}</>;
};

export default Show;
