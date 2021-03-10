import React from 'react';
import { IoCalendar, IoCloud, IoPeople } from 'react-icons/io5';

import { LinkOptions } from './Sidebar.types';
import SidebarSection from './SidebarSection';

const SidebarMainSection: React.FC = () => {
  const mainLinks: LinkOptions[] = [
    { Icon: IoPeople, title: 'Directory', to: 'directory' },
    { Icon: IoCalendar, title: 'Events', to: 'events' },
    {
      Icon: IoCloud,
      onClick: () => {
        if (navigator.vendor === 'Apple Computer, Inc.') {
          window.location.href = 'https://www.notion.so/login';
        } else window.open('https://www.notion.so/login');
      },
      title: 'Knowledge Hub'
    }
  ];

  return <SidebarSection links={mainLinks} title="Main" />;
};

export default SidebarMainSection;
