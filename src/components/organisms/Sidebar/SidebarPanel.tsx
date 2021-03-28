import React from 'react';
import { IoCard, IoExit, IoPerson } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import { PanelAction } from '@organisms/Panel/Panel.types';
import PanelOption from '@organisms/Panel/PanelOption';
import { useStoreState } from '@store/Store';
import useLogout from './useLogout';

const SidebarPanel: React.FC = () => {
  const urlName: string = useStoreState(({ db }) => {
    return db.community.urlName;
  });

  const canCollectDues: boolean = useStoreState(({ db }) => {
    return db.community?.canCollectDues;
  });

  const { push } = useHistory();
  const logout = useLogout();

  // Show a panel that either allows them to view their profile or log out.
  const actions: PanelAction[] = [
    ...(canCollectDues
      ? [
          {
            Icon: IoCard,
            onClick: () => {
              return push(`/${urlName}/membership`);
            },
            text: 'Manage Membership'
          }
        ]
      : []),
    {
      Icon: IoPerson,
      onClick: () => {
        return push(`/${urlName}/profile`);
      },
      text: 'Your Profile'
    },
    { Icon: IoExit, onClick: logout, text: 'Log Out' }
  ];

  return (
    <>
      {actions.map((action) => {
        return <PanelOption key={action.text} {...action} />;
      })}
    </>
  );
};

export default SidebarPanel;
