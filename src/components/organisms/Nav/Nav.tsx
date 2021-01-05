import React from 'react';

import BottomBar from './BottomBar/BottomBar';
import SidebarPanel from './SideBar/Panel';
import SideBar from './SideBar/SideBar';

const Nav: React.FC = () => (
  <>
    <BottomBar />
    <SideBar />
    <SidebarPanel />
  </>
);

export default Nav;
