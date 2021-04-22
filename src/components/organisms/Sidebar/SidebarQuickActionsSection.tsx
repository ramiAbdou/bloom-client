import React from 'react';
import { IoAdd, IoPersonAdd } from 'react-icons/io5';

import { gql } from '@apollo/client';
import { useStoreActions } from '@core/store/Store';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IMember } from '@util/constants.entities';
import { SidebarLinkOptions } from './Sidebar.types';
import SidebarSection from './SidebarSection';

const SidebarQuickActionsSection: ComponentWithFragments<IMember> = ({
  data: member
}) => {
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

  return (
    <SidebarSection data={member} links={quickLinks} title="Quick Actions" />
  );
};

SidebarQuickActionsSection.fragment = gql`
  fragment SidebarQuickActionsSectionFragment on members {
    ...SidebarSectionFragment
  }
  ${SidebarSection.fragment}
`;

export default SidebarQuickActionsSection;
