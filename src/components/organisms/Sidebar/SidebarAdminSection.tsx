import React from 'react';
import {
  // IoExtensionPuzzle,
  IoFolderOpen,
  IoGlobe,
  IoStatsChart
} from 'react-icons/io5';

import { SidebarLinkOptions } from './Sidebar.types';
import SidebarSection from './SidebarSection';

const SidebarAdminSection: React.FC = () => {
  const adminLinks: SidebarLinkOptions[] = [
    { Icon: IoStatsChart, title: 'Analytics', to: 'analytics' },
    { Icon: IoGlobe, title: 'Member Database', to: 'database' },
    { Icon: IoFolderOpen, title: 'Pending Applicants', to: 'applicants' }
    // { Icon: IoExtensionPuzzle, title: 'Integrations', to: 'integrations' }
  ];

  return <SidebarSection links={adminLinks} title="Admin" />;
};

export default SidebarAdminSection;
