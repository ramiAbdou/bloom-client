import React from 'react';
import { isSidebarOpenVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Show from '@components/containers/Show';

const SidebarBackground: React.FC = () => {
  const isOpen: boolean = useReactiveVar(isSidebarOpenVar);

  const onClick = (): void => {
    isSidebarOpenVar(false);
  };

  return (
    <Show show={!!isOpen}>
      <div key="o-nav-bg" className="o-nav-bg" onClick={onClick} />
    </Show>
  );
};

export default SidebarBackground;
