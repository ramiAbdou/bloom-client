/**
 * @fileoverview Component: Header
 * @author Rami Abdou
 */

import './Header.scss';

import React from 'react';
import { useHistory } from 'react-router-dom';

import MultiButton from '@components/Button/MultiButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Spinner from '@components/Loader/Spinner';
import Database from '../../Database.store';
import AddMemberButton from './AddMemberButton';

const AddAdminButton = () => <PrimaryButton title="Add Admin" />;

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

export default () => {
  const loading = Database.useStoreState((store) => store.loading);
  const { pathname } = useHistory().location;
  const isMembers =
    pathname.substring(pathname.lastIndexOf('/') + 1) === 'members';

  return (
    <div className="s-home-header">
      <div>
        <h1 className="s-home-header-title">Member Database</h1>
        {loading && <Spinner dark />}
      </div>

      {!loading && (
        <>
          <MemberAdminButton />
        </>
      )}

      {!loading && isMembers && <AddMemberButton />}
      {!loading && !isMembers && <AddAdminButton />}
    </div>
  );
};
