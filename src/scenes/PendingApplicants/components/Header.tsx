/**
 * @fileoverview Scene: Header
 * @author Rami Abdou
 */

import React, { memo } from 'react';
import shallowequal from 'shallowequal';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Spinner from '@components/Loader/Spinner';
import { LoadingProps } from '@constants';
import { useStoreState } from '@store/Store';

export default memo(({ loading }: LoadingProps) => {
  const title = useStoreState(({ community }) => {
    const length = community?.pendingApplicants?.length;
    return length ? `Pending Applicants (${length})` : 'Pending Applicants';
  }, shallowequal);

  return (
    <div className="s-home-header">
      <div>
        <h1 className="s-home-header-title">{title}</h1>
        {loading && <Spinner dark />}
      </div>

      <div>
        <PrimaryButton title="Accept All" />
        <OutlineButton title="Ignore All" />
      </div>
    </div>
  );
});
