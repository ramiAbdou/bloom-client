import { LOGOUT } from 'core/routing/Router.gql';
import React from 'react';
import { IoCard, IoExit, IoPerson } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import { PanelType } from '@constants';
import useMutation from '@hooks/useMutation';
import PickerOption from '@organisms/Panel/components/Option';
import Panel from '@organisms/Panel/Panel';
import { PanelAction } from '@organisms/Panel/Panel.types';
import { useStoreActions, useStoreState } from '@store/Store';

const SidebarPanel: React.FC = () => {
  const urlName = useStoreState(({ db }) => db.community.urlName);

  const canManageMembership = useStoreState(({ db }) => {
    const isStripeConnected = !!db.entities.integrations.byId[
      db.community.integrations
    ].stripeAccountId;

    const hasPaidMembership = !!db.community.types.some(
      (typeId) => !db.entities.types.byId[typeId]?.isFree
    );

    return isStripeConnected && hasPaidMembership;
  });

  const clearEntities = useStoreActions(({ db }) => db.clearEntities);

  const { push } = useHistory();
  const [logout] = useMutation<boolean>({ name: 'logout', query: LOGOUT });

  const onLogout = async () => {
    const { error } = await logout();
    if (error) return;

    // Clear the entities that we've fetched and reset the Bloom style guide
    // primary color.
    clearEntities();

    const { style } = document.documentElement;
    style.setProperty('--primary', '#f58023');
    style.setProperty('--primary-hex', `245, 128, 35`);
    style.setProperty('--primary-hue', `27`);
    style.setProperty('--gray-1', `hsl(27, 5%, 20%)`);
    style.setProperty('--gray-2', `hsl(27, 5%, 31%)`);
    style.setProperty('--gray-3', `hsl(27, 5%, 51%)`);
    style.setProperty('--gray-4', `hsl(27, 5%, 74%)`);
    style.setProperty('--gray-5', `hsl(27, 5%, 88%)`);
    style.setProperty('--gray-6', `hsl(27, 5%, 96%)`);

    push('/login');
  };

  // Show a picker that either allows them to view their profile or log out.
  const actions: PanelAction[] = [
    ...(canManageMembership
      ? [
          {
            Icon: IoCard,
            onClick: () => push(`/${urlName}/membership`),
            text: 'Manage Membership'
          }
        ]
      : []),
    {
      Icon: IoPerson,
      onClick: () => push(`/${urlName}/profile`),
      text: 'Your Profile'
    },
    { Icon: IoExit, onClick: onLogout, text: 'Log Out' }
  ];

  return (
    <Panel
      align="RIGHT_BOTTOM"
      id={PanelType.PROFILE}
      style={{ marginLeft: 24, minWidth: 270 }}
    >
      {actions.map((action) => (
        <PickerOption key={action.text} {...action} />
      ))}
    </Panel>
  );
};

export default SidebarPanel;
