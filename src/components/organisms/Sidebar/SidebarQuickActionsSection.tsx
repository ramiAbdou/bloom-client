import React from 'react';
import { IoAdd, IoPersonAdd } from 'react-icons/io5';

import { gql } from '@apollo/client';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@components/organisms/Modal/Modal.types';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import { SidebarLinkOptions } from './Sidebar.types';
import SidebarSection from './SidebarSection';

const SidebarQuickActionsSection: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const onAddMemberClick = (): void => {
    showModal({ id: ModalType.ADD_MEMBER });
  };

  const onCreateEventClick = (): void => {
    showModal({ id: ModalType.CREATE_EVENT });
  };

  const quickLinks: SidebarLinkOptions[] = [
    { Icon: IoAdd, onClick: onCreateEventClick, title: 'Create Event' },
    { Icon: IoPersonAdd, onClick: onAddMemberClick, title: 'Add Member' }
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
