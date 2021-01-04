import MainHeader from 'core/templates/Main/Header';
import { NavigationOptionProps } from 'core/templates/Main/Navigation';
import React from 'react';
import { useHistory } from 'react-router-dom';

import AddMemberButton from '@scenes/Home/modals/AddMember/AddMemberButton';
import Loading from '@store/Loading.store';
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
  const loading = Loading.useStoreState((store) => store.loading);

  const { location, push } = useHistory();
  const { pathname } = location;

  const activeIndex =
    pathname.substring(pathname.lastIndexOf('/') + 1) === 'members' ? 0 : 1;

  const options: NavigationOptionProps[] = [
    { onClick: () => push('members'), title: 'Members' },
    { onClick: () => push('admins'), title: 'Admins' }
  ];

  return (
    <MainHeader
      activeIndex={activeIndex}
      className="s-database-header"
      loading={loading}
      options={options}
      title="Member Database"
    >
      {!loading && <AddButton />}
    </MainHeader>
  );
};

export default DatabaseHeader;
