import React from 'react';
import { IoAdd, IoPersonAdd } from 'react-icons/io5';

import { gql } from '@apollo/client';
import { modalVar } from '@core/state/Modal.state';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IMember } from '@util/constants.entities';
import { SidebarLinkOptions } from './Sidebar.types';
import SidebarSection from './SidebarSection';

const SidebarQuickActionsSection: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const quickLinks: SidebarLinkOptions[] = [
    {
      Icon: IoAdd,
      onClick: () =>
        modalVar({ id: ModalType.CREATE_EVENT, options: { sheet: true } }),
      title: 'Create Event'
    },
    {
      Icon: IoPersonAdd,
      onClick: () => modalVar({ id: ModalType.ADD_MEMBERS }),
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
