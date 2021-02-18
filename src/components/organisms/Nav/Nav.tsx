import React from 'react';

import Show from '@containers/Show';
import { useStoreActions, useStoreState } from '@store/Store';
import SideBar from './SideBar';

const NavBackground: React.FC = () => {
  const isOpen = useStoreState(({ nav }) => nav.isOpen);
  const setIsOpen = useStoreActions(({ nav }) => nav.setIsOpen);
  const onClick = () => setIsOpen(false);

  return (
    <Show show={!!isOpen}>
      <div key="o-nav-bg" className="o-nav-bg" onClick={onClick} />
    </Show>
  );
};

const Nav: React.FC = () => {
  return (
    <>
      <SideBar />
      <NavBackground />
    </>
  );
};

export default Nav;
