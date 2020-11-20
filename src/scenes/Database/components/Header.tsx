/**
 * @fileoverview Component: Header
 * @author Rami Abdou
 */

import React, { memo } from 'react';

import Spinner from '@components/Loader/Spinner';
import { LoadingProps } from '@constants';
import { AddMemberButton } from './HeaderButton';

export default memo(({ loading }: LoadingProps) => (
  <div className="s-home-header">
    <div>
      <h1 className="s-home-header-title">Member Database</h1>
      {loading && <Spinner dark />}
    </div>

    {!loading && (
      <>
        <AddMemberButton />
      </>
    )}
  </div>
));
