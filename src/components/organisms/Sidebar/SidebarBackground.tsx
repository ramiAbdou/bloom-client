import React from 'react';

import Show from '@containers/Show';
import { useStoreActions, useStoreState } from '@store/Store';

const SidebarBackground: React.FC = () => {
  const isOpen: boolean = useStoreState(({ sidebar }) => {
    return sidebar.isOpen;
  });

  const setIsOpen = useStoreActions(({ sidebar }) => {
    return sidebar.setIsOpen;
  });

  const onClick = () => {
    return setIsOpen(false);
  };

  return (
    <Show show={!!isOpen}>
      <div key="o-nav-bg" className="o-nav-bg" onClick={onClick} />
    </Show>
  );
};

export default SidebarBackground;
