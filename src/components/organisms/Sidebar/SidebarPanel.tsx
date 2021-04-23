import React from 'react';
import { IoExit, IoPerson } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import { PanelAction } from '@components/organisms/Panel/Panel.types';
import PanelOption from '@components/organisms/Panel/PanelOption';
import useCommunityUrlName from '@core/hooks/useCommunityUrlName';
import useLogout from './useLogout';

const SidebarPanel: React.FC = () => {
  const { push } = useHistory();
  const logout = useLogout();

  const urlName: string = useCommunityUrlName();

  // Show a panel that either allows them to view their profile or log out.
  const actions: PanelAction[] = [
    {
      Icon: IoPerson,
      onClick: () => push(`/${urlName}/profile`),
      text: 'Your Profile'
    },
    { Icon: IoExit, onClick: logout, text: 'Log Out' }
  ];

  return (
    <>
      {actions.map((action) => (
        <PanelOption key={action.text} {...action} />
      ))}
    </>
  );
};

export default SidebarPanel;
