import React from 'react';
import { useHistory } from 'react-router-dom';

import MultiButton from '@components/Button/Multi';
import Spinner from '@components/Loader/Spinner';
import AddMemberButton from '@scenes/Home/modals/AddMember/AddMemberButton';
import Loading from '@store/Loading.store';
import { useStoreState } from '@store/Store';
import AddAdminButton from '../modals/AddAdmin/AddAdminButton';

const MemberAdminButton = () => {
  const { location, push } = useHistory();
  const { pathname } = location;

  const activeIndex =
    pathname.substring(pathname.lastIndexOf('/') + 1) === 'members' ? 0 : 1;

  return (
    <MultiButton
      activeIndex={activeIndex}
      options={[
        { onClick: () => push('members'), title: 'Members' },
        { onClick: () => push('admins'), title: 'Admins' }
      ]}
    />
  );
};

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

export default () => {
  const loading = Loading.useStoreState((store) => store.loading);

  return (
    <div className="s-home-header s-database-header">
      <div>
        <h1 className="s-home-header-title">Member Database</h1>
        {loading && <Spinner dark />}
      </div>

      <MemberAdminButton />
      {!loading && <AddButton />}
    </div>
  );
};
