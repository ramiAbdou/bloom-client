import React from 'react';

import Show from '@components/containers/Show';
import { useStoreActions, useStoreState } from '@store/Store';

const SidebarBackground: React.FC = () => {
  const isOpen: boolean = useStoreState(({ sidebar }) => sidebar.isOpen);
  const setIsOpen = useStoreActions(({ sidebar }) => sidebar.setIsOpen);
  const onClick = () => setIsOpen(false);

  return (
    <Show show={!!isOpen}>
      <div key="o-nav-bg" className="o-nav-bg" onClick={onClick} />
    </Show>
  );
};

export default SidebarBackground;
