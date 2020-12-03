/**
 * @fileoverview Component: Header

 */

import './Header.scss';

import React from 'react';
import { useHistory } from 'react-router-dom';

import MultiButton from '@components/Button/MultiButton';
import Spinner from '@components/Loader/Spinner';
import { useStoreState } from '@store/Store';
import Database from '../../Database.store';
import AddAdminButton from './AddAdminButton';
import AddMemberButton from './AddMemberButton';

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
  const isOwner = useStoreState((store) => store.isOwner);
  const loading = Database.useStoreState((store) => store.loading);
  const { pathname } = useHistory().location;
  const isMembers =
    pathname.substring(pathname.lastIndexOf('/') + 1) === 'members';

  return (
    <div className="s-home-header s-database-header">
      <div>
        <h1 className="s-home-header-title">Member Database</h1>
        {loading && <Spinner dark />}
      </div>

      {!loading && (
        <>
          <MemberAdminButton />
          {isMembers && <AddMemberButton />}
          {!isMembers && isOwner && <AddAdminButton />}
        </>
      )}
    </div>
  );
};
