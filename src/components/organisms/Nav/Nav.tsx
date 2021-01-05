import React from 'react';

import BottomBar from './BottomBar/BottomBar';
import NavStore from './Nav.store';
import SideBar from './SideBar/SideBar';

const Nav: React.FC = () => {
  return (
    <NavStore.Provider>
      <BottomBar />
      <SideBar />
    </NavStore.Provider>
  );
};

export default Nav;
