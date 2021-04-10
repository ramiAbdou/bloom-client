import React from 'react';
import { IoExit, IoPerson } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import { PanelAction } from '@components/organisms/Panel/Panel.types';
import PanelOption from '@components/organisms/Panel/PanelOption';
import { ICommunity } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import useLogout from './useLogout';

const SidebarPanel: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { urlName } = useFindOne(ICommunity, {
    fields: ['urlName'],
    where: { id: communityId }
  });

  // const canCollectDues: boolean = useStoreState(
  //   ({ db }) => db.community?.canCollectDues
  // );

  const { push } = useHistory();
  const logout = useLogout();

  // Show a panel that either allows them to view their profile or log out.
  const actions: PanelAction[] = [
    // ...(canCollectDues
    //   ? [
    //       {
    //         Icon: IoCard,
    //         onClick: () => push(`/${urlName}/membership`),
    //         text: 'Manage Membership'
    //       }
    //     ]
    //   : []),
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
