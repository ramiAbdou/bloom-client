/**
 * @fileoverview Component: Header
 * @author Rami Abdou
 */

import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

import MultiButton from '@components/Button/MultiButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Spinner from '@components/Loader/Spinner';
import Database from '../Database.store';

const AddMemberButton = () => <PrimaryButton title="Add Member" />;

const MemberAdminButton = () => {
  const { push } = useHistory();
  return (
    <MultiButton
      options={[
        { onClick: () => push('members'), title: 'Members' },
        { onClick: () => push('admins'), title: 'Admins' }
      ]}
    />
  );
};

export default () => {
  const loading = Database.useStoreState((store) => store.loading);

  return (
    <div className="s-home-header">
      <div>
        <h1 className="s-home-header-title">Member Database</h1>
        {loading && <Spinner dark />}
      </div>

      {!loading && (
        <>
          <MemberAdminButton />
          <AddMemberButton />
        </>
      )}
    </div>
  );
};
