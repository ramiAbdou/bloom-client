import React from 'react';
import { IoCalendar, IoPeople } from 'react-icons/io5';

import { SidebarLinkOptions } from './Sidebar.types';
import SidebarSection from './SidebarSection';

const SidebarMainSection: React.FC = () => {
  const mainLinks: SidebarLinkOptions[] = [
    { Icon: IoPeople, title: 'Directory', to: 'directory' },
    { Icon: IoCalendar, title: 'Events', to: 'events' }
  ];

  return <SidebarSection links={mainLinks} title="Main" />;
};

export default SidebarMainSection;
