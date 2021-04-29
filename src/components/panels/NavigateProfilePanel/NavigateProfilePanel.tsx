import React from 'react';
import { IoExit, IoPerson } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Panel from '@components/organisms/Panel/Panel';
import { PanelAction } from '@components/organisms/Panel/Panel.types';
import PanelOption from '@components/organisms/Panel/PanelOption';
import useCommunityUrlName from '@core/hooks/useCommunityUrlName';
import useLogout from './useLogout';

const NavigateProfilePanel: React.FC = () => {
  const { push } = useHistory();
  const logout: VoidFunction = useLogout();

  const urlName: string = useCommunityUrlName();

  const onLogoutClick = async (): Promise<void> => {
    await logout();
  };

  const onProfileClick = (): void => {
    push(`/${urlName}/profile`);
  };

  // Show a panel that either allows them to view their profile or log out.
  const actions: PanelAction[] = [
    { Icon: IoPerson, onClick: onProfileClick, text: 'Your Profile' },
    { Icon: IoExit, onClick: onLogoutClick, text: 'Log Out' }
  ];

  return (
    <Panel
      align="RIGHT_BOTTOM"
      style={{ marginLeft: 24, minWidth: 270, padding: 8 }}
    >
      {actions.map((action) => (
        <PanelOption key={action.text} {...action} />
      ))}
    </Panel>
  );
};

export default NavigateProfilePanel;
