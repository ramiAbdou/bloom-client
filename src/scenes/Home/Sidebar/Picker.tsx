import React from 'react';
import { IoCard, IoExit, IoPerson } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import { PickerType } from '@constants';
import useMutation from '@hooks/useMutation';
import PickerOption from '@organisms/Panel/components/Option';
import Panel from '@organisms/Panel/Panel';
import { PanelAction } from '@organisms/Panel/Panel.types';
import { LOGOUT } from '@scenes/Home/Home.gql';
import { useStoreActions, useStoreState } from '@store/Store';

export default () => {
  const encodedUrlName = useStoreState(({ db }) => db.community.encodedUrlName);

  const canManageMembership = useStoreState(({ db }) => {
    return (
      db.entities.integrations.byId[db.community.integrations]
        .stripeAccountId &&
      db.community.types.some(
        (typeId) => !db.entities.types.byId[typeId]?.isFree
      )
    );
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
            onClick: () => push(`/${encodedUrlName}/membership`),
            text: 'Manage Membership'
          }
        ]
      : []),
    { Icon: IoPerson, onClick: () => null, text: 'Your Profile' },
    { Icon: IoExit, onClick: onLogout, separator: true, text: 'Log Out' }
  ];

  return (
    <Panel
      align="RIGHT_BOTTOM"
      id={PickerType.PROFILE}
      style={{ marginLeft: 24, minWidth: 270 }}
    >
      {actions.map((action) => (
        <PickerOption key={action.text} {...action} />
      ))}
    </Panel>
  );
};
