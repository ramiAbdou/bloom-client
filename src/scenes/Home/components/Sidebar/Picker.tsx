import { useMutation } from 'graphql-hooks';
import Cookie from 'js-cookie';
import React from 'react';
import { IoCard, IoExit, IoPerson } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Picker from '@components/Picker/Picker';
import { PickerAction } from '@components/Picker/Picker.store';
import PickerOption from '@components/Picker/PickerOption';
import { PickerType } from '@constants';
import { LOGOUT } from '@scenes/Home/Home.gql';
import { useStoreActions } from '@store/Store';

export default () => {
  const clearEntities = useStoreActions((store) => store.clearEntities);

  const { push } = useHistory();
  const [logout] = useMutation(LOGOUT);

  const onLogout = async () => {
    const { error } = await logout();
    if (error) return;

    // Clear the entities that we've fetched and reset the Bloom style guide
    // primary color.
    clearEntities();

    Cookie.remove('communityId');
    Cookie.remove('role');

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
  const actions: PickerAction[] = [
    { Icon: IoCard, onClick: () => {}, text: 'Manage Membership' },
    { Icon: IoPerson, onClick: () => {}, text: 'Your Profile' },
    { Icon: IoExit, onClick: onLogout, separator: true, text: 'Log Out' }
  ];

  return (
    <Picker
      align="RIGHT_BOTTOM"
      id={PickerType.PROFILE}
      style={{ marginLeft: 24, minWidth: 270 }}
    >
      {actions.map((action) => (
        <PickerOption key={action.text} {...action} />
      ))}
    </Picker>
  );
};
