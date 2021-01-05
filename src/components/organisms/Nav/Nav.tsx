import React from 'react';

import BottomBar from './BottomBar/BottomBar';
import SideBar from './SideBar/SideBar';
import SideBarPanel from './SideBar/SideBarPanel';

const Nav: React.FC = () => (
  <>
    <BottomBar />
    <SideBar />
    <SideBarPanel />
  </>
);

export default Nav;
