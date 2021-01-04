import MainHeader from 'core/templates/Main/Header';
import { NavigationOptionProps } from 'core/templates/Main/Navigation';
import React from 'react';
import { useHistory } from 'react-router-dom';

import AddMemberButton from '@scenes/Home/modals/AddMember/AddMemberButton';
import { useStoreState } from '@store/Store';
import AddAdminButton from '../modals/AddAdmin/AddAdminButton';

/**
 * Either an Add Admin button or Add Member button depending on where the URL
 * path is.
 */
const AddButton = () => {
  const isOwner = useStoreState(({ db }) => db.isOwner);
  const { pathname } = useHistory().location;

  const isMembers =
    pathname.substring(pathname.lastIndexOf('/') + 1) === 'members';

  if (isMembers) return <AddMemberButton />;
  if (isOwner) return <AddAdminButton />;
  return null;
};

const DatabaseHeader = () => {
  const { push } = useHistory();

  const options: NavigationOptionProps[] = [
    { onClick: () => push('members'), pathname: 'members', title: 'Members' },
    { onClick: () => push('admins'), pathname: 'admins', title: 'Admins' }
  ];

  return (
    <MainHeader
      className="s-database-header"
      options={options}
      title="Member Database"
    >
      <AddButton />
    </MainHeader>
  );
};

export default DatabaseHeader;
