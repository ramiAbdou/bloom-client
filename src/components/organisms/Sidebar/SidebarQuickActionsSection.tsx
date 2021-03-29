import React from 'react';
import { IoAdd, IoPersonAdd } from 'react-icons/io5';

import { useStoreActions } from '@store/Store';
import { ModalType } from '@util/constants';
import { SidebarLinkOptions } from './Sidebar.types';
import SidebarSection from './SidebarSection';

const SidebarQuickActionsSection: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const quickLinks: SidebarLinkOptions[] = [
    {
      Icon: IoAdd,
      onClick: () => showModal({ id: ModalType.CREATE_EVENT }),
      title: 'Create Event'
    },
    {
      Icon: IoPersonAdd,
      onClick: () => showModal({ id: ModalType.ADD_MEMBERS }),
      title: 'Add Member'
    }
  ];

  return <SidebarSection links={quickLinks} title="Quick Actions" />;
};

export default SidebarQuickActionsSection;
