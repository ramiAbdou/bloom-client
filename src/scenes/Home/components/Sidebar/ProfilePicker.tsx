import { useMutation } from 'graphql-hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Picker from '@components/Picker/Picker';
import { PickerAction } from '@components/Picker/Picker.store';
import PickerOption from '@components/Picker/PickerOption';
import { LOGOUT } from '@scenes/Home/Home.gql';
import { useStoreActions } from '@store/Store';

const PICKER_ID = 'PROFILE_PICKER';

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
    { onClick: () => {}, text: 'Manage Membership' },
    { onClick: () => {}, text: 'Your Profile' },
    { onClick: onLogout, separator: true, text: 'Log Out' }
  ];

  return (
    <Picker align="RIGHT_BOTTOM" id={PICKER_ID} style={{ marginLeft: 24 }}>
      {actions.map((action) => (
        <PickerOption key={action.text} {...action} />
      ))}
    </Picker>
  );
};
