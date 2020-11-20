/**
 * @fileoverview Scene: Header
 * @author Rami Abdou
 */

import React from 'react';

import MultiButton from '@components/Button/MultiButton';
import PrimaryButton from '@components/Button/PrimaryButton';

export const AddMemberButton = () => <PrimaryButton title="Add Member" />;

export const MemberAdminButton = () => (
  <MultiButton
    options={[
      { onClick: () => {}, title: 'Members' },
      { onClick: () => {}, title: 'Admins' }
    ]}
  />
);
